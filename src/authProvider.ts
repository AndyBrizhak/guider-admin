/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-key */

import { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {
  // Called when the user attempts to log in
  async login({ username, password }) {
    const request = new Request("https://localhost:7078/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    let response;
    try {
      response = await fetch(request);
    } catch {
      throw new Error("Network error");
    }
    if (response.status < 200 || response.status >= 300) {
      const errorResponse = await response.json().catch(() => null);
      throw new Error(
        errorResponse?.message ||
          response.statusText ||
          "Authentication failed",
      );
    }
    const auth = await response.json();

    // Убедимся, что получили токен в ответе
    if (!auth.token) {
      throw new Error("Server response did not include a token");
    }

    // Сохраняем данные аутентификации
    localStorage.setItem("auth", JSON.stringify(auth));
    return Promise.resolve();
  },

  // Called when the user clicks on the logout button
  logout: () => {
    // Удаляем все данные аутентификации
    localStorage.removeItem("auth");
    return Promise.resolve();
  },

  // Called when an error occurs during API call
  checkError: ({ status }: { status: number }) => {
    if (status === 401 || status === 403) {
      // Удаляем все данные аутентификации при ошибке авторизации
      localStorage.removeItem("auth");
      return Promise.reject();
    }
    return Promise.resolve();
  },

  // Called when the user navigates to a new page
  checkAuth: () => {
    // Проверяем наличие данных аутентификации
    const auth = localStorage.getItem("auth");
    return auth ? Promise.resolve() : Promise.reject();
  },

  // Get the user's identity and permissions
  getIdentity: () => {
    const authString = localStorage.getItem("auth");
    if (!authString) return Promise.reject();

    const auth = JSON.parse(authString);
    return Promise.resolve({
      id: auth.id,
      fullName: auth.username,
      avatar: undefined, // Можно добавить аватар, если есть
    });
  },

  // Проверка разрешений пользователя
  getPermissions: () => {
    const authString = localStorage.getItem("auth");
    if (!authString) return Promise.reject();

    const auth = JSON.parse(authString);
    return Promise.resolve(auth.role);
  },
};
