import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useHistory } from "react-router-dom";

export const Register = () => {
  const { store, actions } = useContext(Context);
  const [user, setUser] = useState({});
  let history = useHistory();

  return (
    <div className="text-center mt-5">
      <input
        placeholder="email"
        onChange={(event) => {
          setUser({ ...user, email: event.target.value });
        }}
      ></input>
      <input
        placeholder="password"
        onChange={(event) => {
          setUser({ ...user, password: event.target.value });
        }}
      ></input>
      <button
        onClick={async () => {
          const response = await fetch(
            "https://3001-4geeksacademy-reactflask-hxxcrcs816f.ws-eu38.gitpod.io/api/register",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(user),
            }
          );
          const data = await response.json();
          if (data.token) {
            localStorage.setItem("token", data.token);
            history.push("/protected");
          } else {
            alert("error");
          }
        }}
      >
        register
      </button>
    </div>
  );
};
