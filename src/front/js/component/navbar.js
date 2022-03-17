import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  let history = useHistory();

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <div></div>
        {store.logged != true ? (
          <div className="ml-auto">
            <Link to="/">
              <button className="btn btn-primary">Login</button>
            </Link>
            <Link to="/register">
              <button className="btn btn-warning">Register</button>
            </Link>
          </div>
        ) : (
          <button onClick={() => actions.logout(() => history.push("/"))}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};
