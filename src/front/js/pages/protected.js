import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Protected = () => {
  const { store, actions } = useContext(Context);
  const [checkValidate, setCheckValidate] = useState(false);
  let history = useHistory();
  useEffect(() => {
    validate();
  }, []);
  const validate = async () => {
    if (!(await actions.validate())) {
      history.push("/");
    } else {
      setCheckValidate(true);
    }
  };
  return (
    <>
      {checkValidate ? (
        <div className="jumbotron">this is the protected area</div>
      ) : null}
    </>
  );
};
