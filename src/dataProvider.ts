import { DataProvider, fetchUtils } from "react-admin";
// import { UserRecord } from "./types";

const API_URL = import.meta.env.VITE_API_URL || "https://localhost:7078";
// export const dataProvider = jsonServerProvider(
//   import.meta.env.VITE_JSON_SERVER_URL ||
//     "https://jsonplaceholder.typicode.com",
// );

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const { pagination, sort, filter } = params;
    const { page, perPage } = pagination || { page: 1, perPage: 10 };
    const { field, order } = sort || { field: "id", order: "ASC" };

    // Формируем параметры фильтрации
    const query = {
      page,
      perPage,
      sortField: field,
      sortOrder: order,
      ...filter, // Добавляем фильтры из params.filter
    };

    // Преобразуем объект query в строку запроса
    const queryString = new URLSearchParams(
      query as Record<string, string>,
    ).toString();
    const url = `${API_URL}/${resource}?${queryString}`;

    const response = await fetchUtils.fetchJson(url);

    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Error fetching ${resource}: ${response.body}`);
    }

    return {
      data: response.json,
      total: parseInt(response.headers.get("x-total-count") || "0", 10),
    };
  },
  getOne: async (resource, params) => {
    const url = `${API_URL}/${resource}/${params.id}`;
    const response = await fetchUtils.fetchJson(url);
    return { data: await response.json };
  },
  getMany: async (resource, params) => {
    const url = `${API_URL}/${resource}?id=${params.ids.join(",")}`;
    const response = await fetchUtils.fetchJson(url);
    return { data: await response.json };
  },
  getManyReference: async (resource, params) => {
    const url = `${API_URL}/${resource}?${params.target}=${params.id}`;
    const response = await fetchUtils.fetchJson(url);
    return { data: await response.json, total: response.json.length };
  },
  update: async (resource, params) => {
    const url = `${API_URL}/${resource}/${params.id}`;
    const response = await fetchUtils.fetchJson(url, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });
    return { data: await response.json };
  },
  updateMany: async (resource, params) => {
    const responses = await Promise.all(
      params.ids.map((id) =>
        fetchUtils.fetchJson(`${API_URL}/${resource}/${id}`, {
          method: "PUT",
          body: JSON.stringify(params.data),
        }),
      ),
    );
    return { data: responses.map((response) => response.json.id) };
  },
  create: async (resource, params) => {
    const url = `${API_URL}/${resource}`;
    const response = await fetchUtils.fetchJson(url, {
      method: "POST",
      body: JSON.stringify(params.data),
    });
    return { data: response.json };
  },
  delete: async (resource, params) => {
    const url = `${API_URL}/${resource}/${params.id}`;
    const response = await fetchUtils.fetchJson(url, { method: "DELETE" });
    return { data: response.json };
  },
  deleteMany: async (resource, params) => {
    const responses = await Promise.all(
      params.ids.map((id) =>
        fetchUtils.fetchJson(`${API_URL}/${resource}/${id}`, {
          method: "DELETE",
        }),
      ),
    );
    return { data: responses.map((response) => response.json) };
  },
};
