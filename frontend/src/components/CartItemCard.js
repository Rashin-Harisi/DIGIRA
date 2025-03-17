import React, { useState,useEffect } from "react";
import AddToCart from "./AddToCart";
import { calculatePrice } from "../utils/functions";


const CartItemCard = ({ item: product }) => {

  const productName = product.name[0].split(" ").slice(0, 7).join(" ");
  const colors = product.colors[0].split(",");
  const [price,setPrice] = useState(0)
  
  useEffect(()=>{
    const amount = calculatePrice(product.price, product.discount)
    setPrice(amount * product.quantity )
  },[product.quantity])
  
  return (
    <div className="relative flex gap-3 py-4 pl-4 mb-4 border border-dashed rounded-xl">
      <img
        src={product.images[0]}
        alt="item_image"
        width={40}
        height={40}
        className="rounded-lg"
      />
      <p>{productName} ...</p>
      <p>{colors[0]}</p>
      <p>{price} <span> € </span></p>
      
      <div className="">
        <AddToCart product={product} />
      </div>
    </div>
  );
};

export default CartItemCard;
