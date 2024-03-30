import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { useAuthContext } from "../Api/authContext";
import { json } from "react-router-dom/dist/umd/react-router-dom.development";
import toast from "react-hot-toast";

const Home = () => {
  const [auth, setAuth] = useAuthContext();

  return (
    <Layout
      titleText="Home | Diagon Alley"
      author={"Abyan"}
      desc={
        "Welcome to the home page of Diagon Alley | It is the world of products! Grab you choise !!"
      }
      keywords={"Diagon Alley Home, Diagon Alley"}
    >
      Home
      <pre>{JSON.stringify(auth, null, 4)}</pre>
    </Layout>
  );
};

export default Home;
