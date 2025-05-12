import { AuthProvider } from "react-admin";

export const authProvider: AuthProvider = {
  // Called when the user attempts to log in
  login: ({ username, password }) => {
    if (username === "admin" && password === "password") {
      localStorage.setItem("username", username);
      return Promise.resolve();
    } else {
      return Promise.reject(new Error("Invalid username or password"));
    }
  },
  // Called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem("username");
    return Promise.resolve();
  },
  checkError: ({ status }: { status: number }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem("username");
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // Called when the user navigates to a new page
  checkAuth: () => {
    // Check if the user is logged in by checking localStorage
    return localStorage.getItem("username")
      ? Promise.resolve()
      : Promise.reject();
  },
};
