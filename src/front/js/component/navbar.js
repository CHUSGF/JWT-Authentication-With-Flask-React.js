import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

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
          <button>Logout</button>
        )}
      </div>
    </nav>
  );
};
