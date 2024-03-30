import React from "react";
import Layout from "../Layout/Layout";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Layout
      titleText={"We cannot find the page you are looking for | Diagon Alley"}
    >
      <div className="py-10 ms-[35%]">
        <div>
          <p className="text-base font-semibold text-black">404</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-4 text-base leading-7 text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div class="mt-6 flex items-center">
            <Link
              type="button"
              to={"/"}
              class="inline-flex hover:bg-black hover:text-white transition-all duration-500 ease-in-out items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="mr-2"
              >
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Go back
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
