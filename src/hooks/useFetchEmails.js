import { useState, useEffect } from "react";

export const useFetchEmails = () => {
  const userData = JSON.parse(localStorage.getItem("user")) || {};
  const [emails, setEmails] = useState([]);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchEmails = async (url = "http://68.183.74.14:4005/api/emails/") => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(url, {
        headers: { Authorization: userData.authHeader },
      });

      if (!response.ok) {
        throw new Error("Error loading data");
      }

      const data = await response.json();
      setEmails(data.results);
      setCount(data.count);
      setNext(data.next);
      setPrevious(data.previous);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return { emails, count, next, previous, error, loading, fetchEmails };
};
