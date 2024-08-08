import { useEffect, useState } from "react";
import { useAuthContext } from "../Api/authContext";
import Spinner from "../Components/Loader/Spinner";
import axios from "axios";
import { Outlet } from "react-router-dom";

const AdminRoute = () => {
  try {
    const [ok, setOk] = useState(false);
    const [auth] = useAuthContext();
    useEffect(() => {
      const authCheck = async (token) => {
        const res = await axios.get(
          "https://diagon-alley-p4xm.onrender.com/api/v1/users/admin-auth",
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
      if (auth.token) {
        authCheck(auth.token);
      }
    }, [auth.token]);

    return ok ? <Outlet /> : <Spinner />;
  } catch (error) {
    console.error(error);
  }
};

export default AdminRoute;
