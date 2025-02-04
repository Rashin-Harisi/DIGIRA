import React, { useEffect, useState } from "react";
import SellerCard from "./SellerCard";
import useProducts from "../hooks/useProducts";

const SellerList = () => {
  const products = useProducts();
  const [sellers, setSellers] = useState(null);

  useEffect(() => {
    const getSellers = async () => {
      const response = await fetch("http://localhost:5000/getSellers");
      const data = await response.json();
     
      if (data.success) {
        setSellers(data.data);
      } else {
        console.log("Something went wrong in getting sellers info.");
      }
    };
    getSellers();
  }, []);

  return (
    <div>
      {sellers?.length !== 0 ? (
        <div className="w-[90%] mx-auto mt-5 flex flex-col gap-5">
          {sellers?.map((seller, index) => (
            <SellerCard key={index} seller={seller} products={products} />
          ))}
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default SellerList;
