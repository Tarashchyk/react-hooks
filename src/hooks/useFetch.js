import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import useLocalStorage from "../hooks/useLocalStorage";

export default url => {
  const baseUrl = "https://conduit.productionready.io/api";
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [err, setErr] = useState(null);
  const [options, setOptions] = useState({});
  const [token] = useLocalStorage("token");

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : ""
        }
      }
    };
    if (!isLoading) {
      return;
    }
    axios(`${baseUrl}${url}`, requestOptions)
      .then(res => {
        console.log("success", res);
        setIsLoading(false);
        setResponse(res.data);
      })
      .catch(err => {
        console.log("error", err);
        setIsLoading(false);
        setErr(err.response.data);
      });
  }, [isLoading, options, url, token]);

  return [{ isLoading, response, err }, doFetch];
};
