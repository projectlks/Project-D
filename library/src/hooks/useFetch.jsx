


import { useEffect, useState } from "react";

function useFetch (url, method = 'GET')  {

  let [data, setData] = useState(null);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);
  let [postData,setPostData] = useState(null);





  useEffect(() => {
    let abortController = new AbortController();
    let signal = abortController.signal;

    let options = {
      signal,
      method
    };

    setLoading(true);

    let fetchData = () => {
      fetch(url, options)
        .then((res) => {
          if (!res.ok) {
            throw Error("something was wrong");
          }
          return res.json();
        })
        .then((data) => {
          setData(data);
          setError(null);
          setLoading(false);
        })
        .catch((e) => {
          setError(e.message);
        });
    };

if (method === "POST" && postData) {
  console.log(postData);
  options = {
    ...options,
    // header : {
    //   "Content-Type": "application/json",
    // },

    headers: {
      
      "Content-Type": "application/json" 
    },
    body: JSON.stringify(postData)
  };
fetchData()
}

if (method === "GET") {
fetchData();

}

    return () => {
      abortController.abort();
    };
  }, [url, postData, method]);

  return { data, loading, error, setPostData };
}

export default useFetch;