import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetchProducts from "../utils/fetchProducts";

const useProducts = () => {
  const [products, setProducts] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
     const products = await fetchProducts();
     if(products){
      setProducts(products)
     }
    };

    getProducts();
  }, [navigate]);
  return products;
};

export default useProducts;
