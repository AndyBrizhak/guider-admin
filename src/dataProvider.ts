/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */

import { DataProvider, fetchUtils } from "react-admin";

const API_URL = import.meta.env.VITE_API_URL; /*|| "https://localhost:7001"*/

// Кастомный httpClient для добавления токена авторизации и обработки ошибок
const httpClient = async (url: string, options: fetchUtils.Options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  const auth = localStorage.getItem("auth");
  if (auth) {
    const { token } = JSON.parse(auth);
    options.headers.set("Authorization", `Bearer ${token}`);
  }

  try {
    const response = await fetchUtils.fetchJson(url, options);
    return response;
  } catch (error: any) {
    // Перехват ошибки и переход на dashboard без logout
    window.location.hash = "#/";
    // Можно добавить уведомление, если нужно
    // alert(error?.body || error?.message || "Server error");
    // Возвращаем фиктивный ответ, чтобы не ломать dataProvider
    return {
      status: error.status || 500,
      headers: new Headers(),
      body: error.body || error.message || "Server error",
      json: {},
    };
  }
};

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const { pagination, sort, filter } = params;
    const { page, perPage } = pagination || { page: 1, perPage: 10 };
    const { field, order } = sort || { field: "id", order: "ASC" };

    const query = {
      page,
      perPage,
      sortField: field,
      sortOrder: order,
      ...filter,
    };

    const queryString = new URLSearchParams(
      query as Record<string, string>,
    ).toString();
    const url = `${API_URL}/${resource}?${queryString}`;

    const response = await httpClient(url);

    return {
      data: response.json,
      total: parseInt(response.headers.get("x-total-count") || "0", 10),
    };
  },
  getOne: async (resource, params) => {
    const url = `${API_URL}/${resource}/${params.id}`;
    const response = await httpClient(url);
    return { data: response.json };
  },
  getMany: async (resource, params) => {
    const url = `${API_URL}/${resource}?id=${params.ids.join(",")}`;
    const response = await httpClient(url);
    return { data: response.json };
  },
  getManyReference: async (resource, params) => {
    const url = `${API_URL}/${resource}?${params.target}=${params.id}`;
    const response = await httpClient(url);
    return { data: response.json, total: response.json.length };
  },
  update: async (resource, params) => {
    const url = `${API_URL}/${resource}/${params.id}`;
    const response = await httpClient(url, {
      method: "PUT",
      body: JSON.stringify(params.data),
    });
    return { data: response.json };
  },
  updateMany: async (resource, params) => {
    const responses = await Promise.all(
      params.ids.map((id) =>
        httpClient(`${API_URL}/${resource}/${id}`, {
          method: "PUT",
          body: JSON.stringify(params.data),
        }),
      ),
    );
    return { data: responses.map((response) => response.json.id) };
  },
  create: async (resource, params) => {
    // Проверяем, что создается изображение и есть файл
    if (resource === "images" && params.data.file) {
      console.log("Creating image with params:", params.data);

      const formData = new FormData();

      // Получаем файл из объекта rawFile (React Admin оборачивает файлы)
      const file = params.data.file.rawFile || params.data.file;

      if (!(file instanceof File)) {
        throw new Error("Invalid file object");
      }

      // Добавляем файл с правильным именем поля
      formData.append("ImageFile", file);

      // Добавляем остальные поля с правильными именами
      if (params.data.ImageName) {
        formData.append("ImageName", params.data.ImageName);
      }
      if (params.data.Place) {
        formData.append("Place", params.data.Place);
      }
      if (params.data.City) {
        formData.append("City", params.data.City);
      }
      if (params.data.Province) {
        formData.append("Province", params.data.Province);
      }

      // Логируем содержимое FormData
      console.log("FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // Создаем кастомный httpClient для файлов
      const fileHttpClient = async (url: string, formData: FormData) => {
        const headers = new Headers();

        // НЕ устанавливаем Content-Type для multipart/form-data - браузер сделает это автоматически
        const auth = localStorage.getItem("auth");
        if (auth) {
          const { token } = JSON.parse(auth);
          headers.set("Authorization", `Bearer ${token}`);
        }

        console.log("Sending request to:", url);
        console.log("Request headers:", Object.fromEntries(headers.entries()));

        try {
          // Используем обычный fetch вместо fetchUtils.fetchJson для файлов
          const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: formData,
          });

          console.log("Response status:", response.status);
          console.log(
            "Response headers:",
            Object.fromEntries(response.headers.entries()),
          );

          if (!response.ok) {
            const errorText = await response.text();
            console.error("Server error response:", errorText);
            throw new Error(
              `HTTP error! status: ${response.status}, body: ${errorText}`,
            );
          }

          const json = await response.json();
          console.log("Response JSON:", json);

          return {
            status: response.status,
            headers: response.headers,
            body: json,
            json: json,
          };
        } catch (error: any) {
          console.error("Request failed:", error);
          throw error;
        }
      };

      const url = `${API_URL}/images`;
      const response = await fileHttpClient(url, formData);

      return { data: response.json };
    }

    // Обычный JSON-запрос для других ресурсов
    const url = `${API_URL}/${resource}`;
    const response = await httpClient(url, {
      method: "POST",
      body: JSON.stringify(params.data),
    });
    return { data: response.json };
  },
  delete: async (resource, params) => {
    const url = `${API_URL}/${resource}/${params.id}`;
    const response = await httpClient(url, { method: "DELETE" });
    return { data: response.json };
  },
  deleteMany: async (resource, params) => {
    const responses = await Promise.all(
      params.ids.map((id) =>
        httpClient(`${API_URL}/${resource}/${id}`, {
          method: "DELETE",
        }),
      ),
    );
    return { data: responses.map((response) => response.json) };
  },
};
