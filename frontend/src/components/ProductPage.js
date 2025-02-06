import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import clsx from "clsx";
import { CiShoppingCart } from "react-icons/ci";
import { calculatePrice, getRandomProducts } from "../utils/functions";
import { AiOutlineDelete } from "react-icons/ai";
import ProductCardInHomePage from "./ProductCardInHomePage";

const user = {
  _id: {
    $oid: "678d07aeb4d06a4bd426bbc2",
  },
  role: "USER",
  orders: [],
  isVerified: true,
  createdAt: {
    $date: "2025-01-19T14:09:50.225Z",
  },
  addresses: [],
  payments: [],
  name: "Rashin Harisi",
  username: "rashin.harisi",
  email: "rashin.aharisi1991@gmail.com",
  phone: 123456789,
  password: "$2b$12$XIubebndnZTfK4VBrAUcGu0Y2f6F6Q4MWDNkIOfF6Trlu9wtZwELC",
};
const products = [
  {
    _id: "67979e8cb38783c7a6092394",
    stars: ["678d07aeb4d06a4bd426bbc2"],
    name: ["Kid bag", "Kid bag"],
    company: ["Rara comapny"],
    images: [
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737989771843_images.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737989771843_images.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737989771843_images.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737989771843_images.jpeg",
    ],
    colors: ["red,blue,black"],
    details: ["It is waterproof"],
    createdAt: "2025-01-27T14:56:12.339Z",
    sellerId: "6790c3b59bb2829f2cf386f4",
    price: "20",
    discount: "0",
    status: "waiting",
    storage_quantity: 5,
    __v: 0,
  },
  {
    _id: "67979e8cb38783c7a6092395",
    stars: [],
    name: ["Kid bag", "Kid bag"],
    company: ["Rara comapny"],
    images: [
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737989771843_images.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737989771843_images.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737989771843_images.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737989771843_images.jpeg",
    ],
    colors: ["red,blue,black"],
    details: ["It is waterproof"],
    createdAt: "2025-01-27T14:56:12.339Z",
    sellerId: "6790c3b59bb2829f2cf386f4",
    price: "20",
    discount: "10",
    status: "waiting",
    storage_quantity: 5,
    __v: 0,
  },
  {
    _id: "67979e8cb38783c7a6092396",
    stars: [],
    name: ["Kid bag", "Kid bag"],
    company: ["Rara comapny"],
    images: [
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737989771843_images.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737989771843_images.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737989771843_images.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737989771843_images.jpeg",
    ],
    colors: ["red,blue,black"],
    details: ["It is waterproof"],
    createdAt: "2025-01-27T14:56:12.339Z",
    sellerId: "6790c3b59bb2829f2cf386f4",
    price: "20",
    discount: "10",
    status: "waiting",
    storage_quantity: 5,
    __v: 0,
  },
  {
    _id: "6797a194b38783c7a6092408",
    stars: [],
    name: ["Mobile ", "Mobile "],
    company: ["Mumbai"],
    images: [
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
    ],
    colors: ["red,blue,black"],
    details: ["It is cheep one that you can find."],
    createdAt: "2025-01-27T15:09:08.199Z",
    sellerId: "6790c3b59bb2829f2cf386f4",
    price: "400",
    discount: "5",
    status: "waiting",
    storage_quantity: 5,
    __v: 0,
  },
  {
    _id: "6797a194b38783c7a6092407",
    stars: ["678d07aeb4d06a4bd426bbc2"],
    name: ["Mobile ", "Mobile "],
    company: ["Mumbai"],
    images: [
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
    ],
    colors: ["red,blue,black"],
    details: ["It is cheep one that you can find."],
    createdAt: "2025-01-27T15:09:08.199Z",
    sellerId: "6790c3b59bb2829f2cf386f4",
    price: "400",
    discount: "0",
    status: "waiting",
    storage_quantity: 5,
    __v: 0,
  },
  {
    _id: "6797a194b38783c7a6092406",
    stars: [],
    name: ["Mobile ", "Mobile "],
    company: ["Mumbai"],
    images: [
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
    ],
    colors: ["red,blue,black"],
    details: ["It is cheep one that you can find."],
    createdAt: "2025-01-27T15:09:08.199Z",
    sellerId: "6790c3b59bb2829f2cf386f4",
    price: "400",
    discount: "5",
    status: "waiting",
    storage_quantity: 5,
    __v: 0,
  },
  {
    _id: "6797a194b38783c7a6092405",
    stars: ["678d07aeb4d06a4bd426bbc2"],
    name: ["Mobile ", "Mobile "],
    company: ["Mumbai"],
    images: [
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
      "https://fullstack-online-shop.s3.eu-north-1.amazonaws.com/1737990547840_images%20%281%29.jpeg",
    ],
    colors: ["red,blue,black"],
    details: ["It is cheep one that you can find."],
    createdAt: "2025-01-27T15:09:08.199Z",
    sellerId: "6790c3b59bb2829f2cf386f4",
    price: "400",
    discount: "5",
    status: "waiting",
    storage_quantity: 5,
    __v: 0,
  },
];
const ProductPage = () => {
  const { _id } = useParams();
  const product = products?.filter((product) => product._id === _id);
  const [imageIndex, setImageIndex] = useState(0);
  const [heartClicked, setHeartClicked] = useState(false);
  const [addToCart, setAddToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const storage_quantity = product[0].storage_quantity;
  const colors = product[0].colors[0].split(",");
  const [color, setColor] = useState(colors[0]);
  const [productsList, setProductsList] = useState(null);

  const otherProductsOfSeller = products.filter(
    (item) => item.sellerId === product[0].sellerId
  );
  useEffect(() => {
    if (otherProductsOfSeller?.length > 3) {
      setProductsList(getRandomProducts(otherProductsOfSeller, 3));
    }
  }, []);

  useEffect(() => {
    const result = product[0].stars.includes(user._id.$oid);
    if (result) {
      setHeartClicked(true);
    }
  }, [user]);

  const heartHandle = () => {
    setHeartClicked((prevState) => !prevState);
    const result = product[0].stars.includes(user._id.$oid);
    if (!result && !heartClicked) {
      product[0].stars.push(user._id.$oid);
      console.log("the id is added", product[0].stars);
    } else if (result && heartClicked) {
      const index = product[0].stars.indexOf(user._id.$oid);
      if (index !== -1) {
        product[0].stars.splice(index, 1);
      }
      console.log("The id is removed", product[0].stars);
    }
  };

  return (
    <>
      <div className="flex gap-5">
        <div className="flex min-h-[300px] ml-4 gap-5 border border-[#31572C] rounded-xl px-3">
          <div className="flex flex-col justify-around">
            {product[0].images.map((image, index) => (
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
              src={product[0].images[imageIndex]}
              alt="big_image"
              height={280}
              width={280}
              className="rounded-xl mt-3"
            />
          </div>
        </div>
        <div className="flex flex-grow">
          <div className="w-[70%] flex flex-col gap-5 text-lg">
            <p className="font-bold">{product[0].name[0]}</p>
            <p>{product[0].company}</p>
            <p>Available in Stock : {product[0].storage_quantity}</p>
            <div className="flex gap-5">
              <p>Choose the color: </p>
              <select
                name="colors"
                className="text-[#31572C]"
                onChange={(event) => setColor(event.target.value)}
              >
                {colors.map((color, index) => (
                  <option key={index} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>
            <p>Details : {product[0].details}</p>
          </div>
          <div className="flex-grow relative ">
            <button onClick={heartHandle} className="absolute right-2 top-0">
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
                  "line-through opacity-80": product[0].discount !== "0",
                })}
              >
                {product[0].price}
                <span> €</span>
              </p>
              {product[0].discount !== "0" && (
                <p className="ml-2 text-lg">
                  {calculatePrice(product[0].price, product[0].discount)}
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
      {otherProductsOfSeller?.length !== 0 && (
        <div>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">
              OTHER PRODUCTS OF THIS SELLER
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="flex justify-around">
            {productsList
              ? productsList.map((product, index) => (
                  <ProductCardInHomePage key={index} product={product} />
                ))
              : otherProductsOfSeller.map((product, index) => (
                  <ProductCardInHomePage key={index} product={product} />
                ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductPage;
