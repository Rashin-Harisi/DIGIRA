const fetchProducts = async () => {
    const response = await fetch("http://localhost:5001/getProducts");
    const data = await response.json();
    if (data.success) {
      return data.data
    } else {
      console.log("Something went wrong in getting all products");
    }     
}

export default fetchProducts