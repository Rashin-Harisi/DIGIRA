import { useState, useEffect } from "react";
import fetchProducts from "../utils/fetchProducts";

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const products = await fetchProducts();
        setProducts(products);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

  return { products, isLoading, error };
};

export default useProducts;
