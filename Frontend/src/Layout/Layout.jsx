import React from "react";
import { Helmet } from "react-helmet";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, titleText, desc, author, keywords }) => {
  return (
    <>
      <Helmet>
        <title>{titleText}</title>
        <meta name="description" content={desc} />
        <meta name="author" content={author} />
        <meta name="keywords" content={keywords} />
      </Helmet>
      <header className="fixed w-full">
        <Navbar />
      </header>
      <main className="min-h-screen pt-20">
        <Toaster />
        {children}
        </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
