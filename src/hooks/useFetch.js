import { useState, useEffect } from "react";
import axios from "axios";

export default url => {
  const baseUrl = "https://conduit.productionready.io/api";
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [err, setErr] = useState(null);
  const [options, setOptions] = useState({});

  const doFetch = (options = {}) => {
    setOptions(options);
    setIsLoading(true);
  };

  useEffect(() => {
    if (!isLoading) {
      return;
    }
    axios(`${baseUrl}${url}`, options)
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
  }, [isLoading]);

  return [{ isLoading, response, err }, doFetch];
};
