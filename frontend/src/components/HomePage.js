import React from "react";
import Banner from "./Banner";
import ProductsPage from "./ProductsPage";


const HomePage = () => {
  return (
    <div>
      <Banner />
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500">PRODUCTS</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <ProductsPage />
    </div>
  );
};

export default HomePage;
