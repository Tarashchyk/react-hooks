import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";

import "./authentication.css";

import useFetch from "../../hooks/useFetch";

const Authentication = props => {
  const isLogin = props.match.path === "/login";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [{ response, isLoading, err }, doFetch] = useFetch("/users/login");

  console.log("fff", isLogin);

  const handleChangeEmail = e => {
    setEmail(e.target.value);
  };

  const handleChangePassword = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("data", email, password);
    doFetch({
      method: "post",
      data: {
        user: {
          email: "qq@qq.com",
          password: "123"
        }
      }
    });
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-center">Login</h1>
            <p className="text-center">
              <Link to="register" className="accreg">
                Need an account?
              </Link>
            </p>
            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    value={email}
                    onChange={handleChangeEmail}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    value={password}
                    onChange={handleChangePassword}
                  />
                </fieldset>
                <button
                  className="btn btn-lg btn-success float-right"
                  type="submit"
                  disabled={isLoading}
                >
                  Sign in
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
