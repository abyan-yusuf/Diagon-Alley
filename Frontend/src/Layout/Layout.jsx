import React from "react";
import { Helmet } from "react-helmet";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Navigation/Navbar";
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
      <header className="sticky top-0 w-full z-50">
        <Navbar />
      </header>
      <main className="min-h-screen px-2">
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
