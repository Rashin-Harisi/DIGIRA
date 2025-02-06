import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { calculatePrice } from "../utils/functions";
import { useNavigate } from "react-router-dom";

const user= {
  "_id": {
    "$oid": "678d07aeb4d06a4bd426bbc2"
  },
  "role": "USER",
  "orders": [],
  "isVerified": true,
  "createdAt": {
    "$date": "2025-01-19T14:09:50.225Z"
  },
  "addresses": [],
  "payments": [],
  "name": "Rashin Harisi",
  "username": "rashin.harisi",
  "email": "rashin.aharisi1991@gmail.com",
  "phone": 123456789,
  "password": "$2b$12$XIubebndnZTfK4VBrAUcGu0Y2f6F6Q4MWDNkIOfF6Trlu9wtZwELC"
}

const ProductCardInHomePage = (product) => {
  const productN = product.product;
  const [heartClicked, setHeartClicked] = useState(false);
  const navigate = useNavigate();
  
  useEffect(()=>{
    const result = productN.stars.includes(user._id.$oid)
    if(result){
      setHeartClicked(true)
    }
  },[user])
  const heartHandle =() => {
    setHeartClicked((prevState) => !prevState)
    const result = productN.stars.includes(user._id.$oid)
    if (!result && !heartClicked){
      productN.stars.push(user._id.$oid)
      console.log("the id is added",productN.stars);
    }else if(result && heartClicked){
      const index = productN.stars.indexOf(user._id.$oid)
      if(index!== -1){
        productN.stars.splice(index,1)
      }
      console.log("The id is removed", productN.stars)
    }
  }
  return (
    <div className="border w-[30%] min-h-[300px] relative rounded-xl" >
      <button
        onClick={heartHandle}
        className="absolute top-3 left-3"
      >
        {heartClicked ? (
          <FaHeart
            className={clsx("text-2xl", { "text-red-500": heartClicked })}
          />
        ) : (
          <CiHeart className="text-2xl" />
        )}
      </button>
      {productN.discount !== "0" && (
        <span className="absolute -top-3 -right-3 border border-red-500 rounded-full w-10 h-10 bg-red-500 text-black z-10 flex justify-center items-center font-bold">
          %{productN.discount}
        </span>
      )}
      <div className="absolute top-3 left-10 flex gap-4">
        <img src={productN.images[0]} alt="productImage" className="rounded-xl" onClick={()=>navigate(`/${productN._id}`)}/>
        <div className="flex flex-col justify-between">
            {productN.images.map((image, index) => index!==0 && (
                <img  key={index} src={image} alt="productImages" width={50} height={50} className="rounded-xl"/>
            )   
            )}
        </div>
      </div>
      <div className="absolute bottom-5 flex justify-between w-full px-8 " onClick={()=>navigate(`/${productN._id}`)}>
        <p className="text-xl">{productN.name[0]}</p>
        <div className="flex">
            <p className={clsx(" text-xl",{"line-through opacity-80" : productN.discount !== "0"})}>{productN.price}<span> €</span></p>
            {productN.discount !== "0" && <p className="ml-2 text-xl">{calculatePrice(productN.price, productN.discount)}<span> €</span></p>}
        </div>
      </div>
    </div>
  );
};

export default ProductCardInHomePage;
