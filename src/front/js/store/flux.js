import { Redirect } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      logged: false,
    },
    actions: {
      // Use getActions to call a function within a fuction
      validate: async () => {
        const response = await fetch(
          "https://3001-4geeksacademy-reactflask-hxxcrcs816f.ws-eu38.gitpod.io/api/validate",
          {
            method: "get",
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        console.log(data.validate);
        setStore({ logged: data.validate });
        return data.validate;
      },
      logout: (redirectToLogin) => {
        setStore({ logged: false });
        localStorage.removeItem("token");
        redirectToLogin();
      },
    },
  };
};

export default getState;
