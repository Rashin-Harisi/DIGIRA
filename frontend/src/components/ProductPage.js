import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import clsx from "clsx";
import { CiShoppingCart } from "react-icons/ci";
import { calculatePrice, getRandomProducts } from "../utils/functions";
import { AiOutlineDelete } from "react-icons/ai";
import ProductCardInHomePage from "./ProductCardInHomePage";
import useProduct from '../hooks/useProduct'
import useProducts from "../hooks/useProducts"
import useUser from "../hooks/useUser"



const ProductPage = () => {
  const { _id } = useParams();
  const user = useUser()
  const { product, isLoading} = useProduct(_id);
  const {products,isLoading:loading} = useProducts()  
 const [imageIndex, setImageIndex] = useState(0);
 const [heartClicked, setHeartClicked] = useState(false);
 const [addToCart, setAddToCart] = useState(false);
 const [quantity, setQuantity] = useState(1);
 const storage_quantity = product?.storage_quantity;
 const colors = product?.colors[0].split(",");
 const [color, setColor] = useState("");
 const [productsList, setProductsList] = useState(null);


 useEffect(() => {
  const otherProductsOfSeller = products.filter(
    (item) => item.sellerId === product?.sellerId
  );
  if (otherProductsOfSeller?.length > 3) {
    setProductsList(getRandomProducts(otherProductsOfSeller, 3));
  }else{
    setProductsList(otherProductsOfSeller)
  }
 }, [products])
 
  useEffect(()=>{
    if(colors && colors.length>0){
      setColor(colors[0])
    }else{
      setColor("")
    }
  },[colors])
  
 useEffect(() => {
   const result = product?.stars.includes(user._id);
   if (result) {
     setHeartClicked(true);
   }
 }, [user]);

 

 
 const heartHandle = async () => {
  setHeartClicked((prevState) => !prevState);
    const result = product?.stars.includes(user?._id);
    var status;
    if (!result && !heartClicked) {
      product.stars.push(user?._id);
      status = "liked"
      console.log("the id is added", product.stars);
    } else if (result && heartClicked) {
      const index = product.stars.indexOf(user?._id);
      if (index !== -1) {
        product.stars.splice(index, 1);
      }
      status = "unLiked"
      console.log("The id is removed", product.stars);
    }
    if(user){
    const response = await fetch("http://localhost:5001/likeHandle", {
      method: "POST",
      body: JSON.stringify({
        userId: user._id,
        productId: product._id,
        status,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.status) {
      console.log(data.message);
    } else {
      console.log("there is error in handling like in database.");
    }
  }else{
    console.log("there is no user.")
  }    
};
  return (
    <>
    {isLoading ? <div>Data is loading...</div> : (
      <div className="flex gap-5">
      <div className="flex min-h-[300px] ml-4 gap-5 border border-[#31572C] rounded-xl px-3">
          <div className="flex flex-col justify-around">
            {product?.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`image${index}`}
                width={50}
                height={50}
                className="rounded-xl"
                onClick={() => setImageIndex(index)}
              />
            ))}
          </div>
          <div>
            <img
              src={product?.images[imageIndex]}
              alt="big_image"
              height={280}
              width={280}
              className="mt-3 rounded-xl"
            />
          </div>
        </div>
        <div className="flex flex-grow">
          <div className="w-[70%] flex flex-col gap-5 text-lg">
            <p className="font-bold">{product?.name[0]}</p>
            <p>{product?.company}</p>
            <p>Available in Stock : {product?.storage_quantity}</p>
            <div className="flex gap-5">
              <p>Choose the color: </p>
              <select
                name="colors"
                className="text-[#31572C]"
                onChange={(event) => setColor(event.target.value)}
              >
                {colors?.map((color, index) => (
                  <option key={index} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
            <p>Details : {product?.details}</p>
          </div>
          <div className="relative flex-grow ">
            <button onClick={heartHandle} className="absolute top-0 right-2">
              {heartClicked ? (
                <FaHeart
                  className={clsx("text-2xl", { "text-red-500": heartClicked })}
                />
              ) : (
                <CiHeart className="text-2xl" />
              )}
            </button>
            <div className="absolute top-[50%] flex gap-5">
              <p className="text-lg">Price : </p>
              <p
                className={clsx(" text-lg", {
                  "line-through opacity-80": product?.discount !== "0",
                })}
              >
                {product?.price}
                <span> €</span>
              </p>
              {product?.discount !== "0" && (
                <p className="ml-2 text-lg">
                  {calculatePrice(product?.price, product?.discount)}
                  <span> €</span>
                </p>
              )}
            </div>
            <button
              onClick={() => setAddToCart(true)}
              className={clsx(
                "border absolute bottom-4 w-[200px] h-[50px] rounded-xl flex justify-center items-center gap-4  bg-[#ECF39E] text-[#31572C]",
                { hidden: addToCart }
              )}
            >
              Add to cart{" "}
              <span>
                <CiShoppingCart className="text-xl" />
              </span>
            </button>
            <div
              className={clsx(
                "absolute bottom-4 w-[200px] h-[50px] border rounded-xl flex justify-center items-center text-xl bg-[#ECF39E] text-[#31572C]",
                { hidden: !addToCart }
              )}
            >
              <button
                className={clsx(
                  "w-9 h-9 border rounded-xl mx-2 text-center text-[#ECF39E] bg-[#31572C] flex justify-center items-center",
                  {}
                )}
                onClick={ ()=>{
                    if(quantity === 1){
                        setAddToCart(!addToCart)
                    }else{
                        setQuantity(quantity - 1)
                    }
                }
                }
              >
                {quantity === 1 ? <AiOutlineDelete /> : "-"}
              </button>
              <span className="underline">{quantity}</span>
              <button
                className={clsx(
                  "w-9 h-9 border rounded-xl mx-2 text-center text-[#ECF39E] bg-[#31572C]",
                  { "cursor-not-allowed": quantity === storage_quantity }
                )}
                disabled={quantity === storage_quantity}
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
        </div>
    </div>
    )}
      
      {productsList?.length !== 0 && (
        <div>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">
              OTHER PRODUCTS OF THIS SELLER
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="flex justify-around">
            {productsList?.map((product, index) => (
                  <ProductCardInHomePage key={index} product={product} />
                ))
              } 
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
