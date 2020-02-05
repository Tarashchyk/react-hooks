import { useState, useEffect } from "react";

export default (key, initialValue = "") => {
  const [value, setValues] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value]);

  return [value, setValues];
};
