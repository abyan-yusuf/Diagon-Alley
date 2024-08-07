import { useEffect, useState } from "react";
import { useAuthContext } from "../Api/authContext";
import { Outlet } from "react-router-dom";
import Spinner from "../Components/Loader/Spinner";
import axios from "axios";

const Private = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuthContext();

  useEffect(() => {
    const authCheck = async (token) => {
      const res = await axios.get(
        "https://diagon-alley-p4xm.onrender.com
        /api/v1/users/user-auth",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(res);
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck(auth.token);
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
};

export default Private;
