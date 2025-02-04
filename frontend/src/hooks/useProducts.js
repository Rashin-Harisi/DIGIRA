import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useProducts = () => {
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetch("http://localhost:5000/getProducts");
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      } else {
        console.log("Something went wrong in getting all products");
      }
    };

    getUserInfo();
  }, [navigate]);
  return products;
};

export default useProducts;
