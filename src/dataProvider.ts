import { DataProvider, fetchUtils } from "react-admin";

const API_URL = import.meta.env.VITE_API_URL || "https://localhost:7078";
// export const dataProvider = jsonServerProvider(
//   import.meta.env.VITE_JSON_SERVER_URL ||
//     "https://jsonplaceholder.typicode.com",
// );

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const url = `${API_URL}/${resource}`;
    const { pagination, sort } = params;
    const { page, perPage } = pagination || { page: 1, perPage: 10 };
    const { field, order } = sort || { field: "id", order: "ASC" };
    const response = await fetchUtils.fetchJson(
      `${url}?page=${page}&perPage=${perPage}&sortField=${field}&sortOrder=${order}`,
    );
    if (response.status < 200 || response.status >= 300) {
      throw new Error(`Error fetching ${resource}: ${response.body}`);
    }
    const data = await response.json();
    return { data, total: data.length };
  },
  getOne: async (resource, params) => {
    const url = `${API_URL}/${resource}/${params.id}`;
    const response = await fetchUtils.fetchJson(url);
    return { data: await response.json() };
  },
  getMany: async (resource, params) => {
    const url = `${API_URL}/${resource}?id=${params.ids.join(",")}`;
    const response = await fetchUtils.fetchJson(url);
    return { data: await response.json() };
  },
  getManyReference: async (resource, params) => {
    const url = `${API_URL}/${resource}?${params.target}=${params.id}`;
    const response = await fetchUtils.fetchJson(url);
    return { data: await response.json(), total: response.json().length };
  },
  update: async (resource, params) => {
    const url = `${API_URL}/${resource}/${params.id}`;
    const response = await fetchUtils.fetchJson(url, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });
    return { data: await response.json() };
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
    return { data: responses.map((response) => response.json().id) };
  },
  create: async (resource, params) => {
    const url = `${API_URL}/${resource}`;
    const response = await fetchUtils.fetchJson(url, {
      method: "POST",
      body: JSON.stringify(params.data),
    });
    return { data: await response.json() };
  },
  delete: async (resource, params) => {
    const url = `${API_URL}/${resource}/${params.id}`;
    await fetchUtils.fetchJson(url, { method: "DELETE" });
    return { data: params.previousData };
  },
  deleteMany: async (resource, params) => {
    const responses = await Promise.all(
      params.ids.map((id) =>
        fetchUtils.fetchJson(`${API_URL}/${resource}/${id}`, {
          method: "DELETE",
        }),
      ),
    );
    return { data: responses.map((response) => response.json().id) };
  },
};
