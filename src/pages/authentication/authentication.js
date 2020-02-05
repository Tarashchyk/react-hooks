import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

import "./authentication.css";

import useFetch from "../../hooks/useFetch";
import useLocalStorage from "../../hooks/useLocalStorage";

const Authentication = props => {
  const isLogin = props.match.path === "/login";
  const buttonTitle = isLogin ? "Sign in" : "Sign up";
  const pageTitle = isLogin ? "Log in" : "Registration";
  const descriptionLink = isLogin ? "register" : "login";
  const descriptionText = isLogin ? "Need an account" : "Have an account?";
  const apiUrl = isLogin ? "/users/login" : "/users";

  const [email, setEmail] = useState("");
  const [isSuccessfullySubmit, setIsSuccessfullySubmit] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [{ response, isLoading, err }, doFetch] = useFetch(apiUrl);
  const [token, setToken] = useLocalStorage("token");

  console.log("token", token);

  const handleChangeEmail = e => {
    setEmail(e.target.value);
  };

  const handleChangePassword = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("data", email, password);
    const user = isLogin ? { email, password } : { email, password, username };
    doFetch({
      method: "post",
      data: {
        user
      }
    });
  };

  useEffect(() => {
    if (!response) {
      return;
    }
    setToken(response.user.token);
    setIsSuccessfullySubmit(true);
  }, [response]);

  if (isSuccessfullySubmit) {
    return <Redirect to="/" />;
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-center">{pageTitle}</h1>
            <p className="text-center">
              <Link to={descriptionLink} className="accreg">
                {descriptionText}
              </Link>
            </p>
            <form onSubmit={handleSubmit}>
              <fieldset>
                {!isLogin && (
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Username"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                    />
                  </fieldset>
                )}
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
                  {buttonTitle}
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
