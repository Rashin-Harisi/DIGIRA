import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { calculatePrice } from "../utils/functions";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import AddToCart from "./AddToCart";

const ProductCardInHomePage = (product) => {
  const userStore = useUserStore((state) => state.user);

  const productN = product.product;
  const [heartClicked, setHeartClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userStore) {
      const result = productN.stars.includes(userStore._id);
      if (result) {
        setHeartClicked(true);
      }
    }
  }, [userStore]);

  const productName = productN.name[0].split(" ").slice(0, 5).join(" ");

  const heartHandle = async () => {
    setHeartClicked((prevState) => !prevState);
    const result = productN.stars.includes(userStore?._id);
    var status;
    if (!result && !heartClicked) {
      productN.stars.push(userStore?._id);
      status = "liked";
      console.log("the id is added", productN.stars);
    } else if (result && heartClicked) {
      const index = productN.stars.indexOf(userStore?._id);
      if (index !== -1) {
        productN.stars.splice(index, 1);
      }
      status = "unLiked";
      console.log("The id is removed", productN.stars);
    }
    if (userStore) {
      const response = await fetch("http://localhost:5001/likeHandle", {
        method: "POST",
        body: JSON.stringify({
          userId: userStore._id,
          productId: productN._id,
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
    } else {
      console.log("there is no user.");
    }
  };
  return (
    <div className="border w-[30%] min-h-[450px] relative flex flex-col rounded-xl bg-white text-black">
      <button onClick={heartHandle} className="absolute top-3 left-3">
        {heartClicked ? (
          <FaHeart
            className={clsx("text-2xl", { "text-red-500": heartClicked })}
          />
        ) : (
          <CiHeart className="text-2xl" />
        )}
      </button>
      {productN.discount !== "0" && (
        <span className="absolute z-10 flex items-center justify-center w-10 h-10 font-bold text-black bg-red-500 border border-red-500 rounded-full -top-3 -right-3">
          %{productN.discount}
        </span>
      )}
      <div className="flex gap-4 mt-3 ml-10 min-h-[200px] w-[85%] mx-auto">
        <img
          src={productN.images[0]}
          alt="productImage"
          className="border border-gray-300 shadow-md rounded-xl"
          width={200}
          height={200}
          onClick={() => navigate(`/${productN._id}`)}
        />
        <div className="flex flex-col justify-between">
          {productN.images.map(
            (image, index) =>
              index !== 0 && (
                <img
                  key={index}
                  src={image}
                  alt="productImages"
                  width={70}
                  height={70}
                  className="border border-gray-300 shadow-md rounded-xl"
                />
              )
          )}
        </div>
      </div>
      <div
        className="flex flex-col justify-between w-[90%] mx-auto mt-5"
        onClick={() => navigate(`/${productN._id}`)}
      >
        <p className="text-lg">{productName} ...</p>
        <div className="flex">
          <p
            className={clsx(" text-lg", {
              "line-through opacity-80": productN.discount !== "0",
            })}
          >
            {productN.price}
            <span> €</span>
          </p>
          {productN.discount !== "0" && (
            <p className="ml-2 text-lg">
              {calculatePrice(productN.price, productN.discount)}
              <span> €</span>
            </p>
          )}
        </div>
      </div>
      <div className=" w-[200px] mx-auto">
        <AddToCart product={productN}/>
      </div>
    </div>
  );
};

export default ProductCardInHomePage;
