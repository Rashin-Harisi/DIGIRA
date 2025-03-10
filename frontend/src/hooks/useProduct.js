import { useState, useEffect } from "react";

const useProduct = (id) => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5001/getProduct", {
          method: "POST",
          body: JSON.stringify({ id }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (!data.success) {
          throw new Error("Product not found");
        } else {
          setProduct(data.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, isLoading, error };
};

export default useProduct;
