import React, { useEffect, useState } from "react";

const useLogin = (username: string, password: string) => {
  const [resp, setResp] = useState({});
  useEffect(() => {
    //handle login

    let body = JSON.stringify({
      email: "user@example.com",
      password: "string",
    });
    fetch("http://103.77.214.189:8000/login/", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: body,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw res.json();
        }
      })
      .then((data) => {
        console.log("fetch login success:" + data);
        setResp(data);
      })
      .catch((err) => console.log(err));

    //
  }, []);
  return [resp];
};

export default useLogin;
