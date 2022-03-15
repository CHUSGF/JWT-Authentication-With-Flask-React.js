const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      logged: true,
    },
    actions: {
      // Use getActions to call a function within a fuction
      validate: async () => {
        const response = await fetch(
          "https://3001-4geeksacademy-reactflask-hxxcrcs816f.ws-eu34.gitpod.io/api/validate",
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
    },
  };
};

export default getState;
