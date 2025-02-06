import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import discount from "../utils/discount.json";
import delivery from "../utils/delivery.json";
import shop from "../utils/shop.json";
import { motion, AnimatePresence } from "framer-motion";
import "react-slideshow-image/dist/styles.css";
import cloths from "../assets/cloths.jpg";
import appliance from "../assets/appliance.jpg";
import book from "../assets/book.jpg";
import tech from "../assets/tech.jpg";


const banner = [
  {
    id: 1,
    text: "Fastest Delivery",
    animation: delivery,
  },
  {
    id: 2,
    text: "Shop by one click",
    animation: shop,
  },
  {
    id: 4,
    text: "Best offers",
    animation: discount,
  },
];
const pictures = [
  {
    id: 1,
    src: cloths,
    alt: "CLOTHS"
  },
  {
    id: 2,
    src: book,
    alt: "BOOK"
  },
  {
    id: 3,
    src: tech,
    alt:"TECH"
  },
  {
    id: 4,
    src: appliance,
    alt: "APPLIANCE"
  },
];

const Banner = () => {
  const [index, setIndex] = useState(0);
  const [indexPic,setIndexPic] = useState(0)

  useEffect(() => {
    const interval = setTimeout(() => {
      setIndex((prevIndex) =>
        prevIndex === banner.length - 1 ? 0 : prevIndex + 1
      );
    }, 7000);

    return () => clearTimeout(interval);
  }, [index]);

  const previousHandler = ()=>{
    setIndexPic((prevIndex) =>
        prevIndex === 0 ? pictures.length-1 : prevIndex - 1
      );
  }
  const nextHandler = ()=>{
    setIndexPic((prevIndex) =>
        prevIndex === pictures.length - 1 ? 0 : prevIndex + 1
      );
  }
  return (
    <div className="flex gap-3">
      <div className="relative w-[400px] h-[400px] flex justify-center items-center overflow-hidden ">
        <AnimatePresence mode="wait">
          <motion.div
            key={banner[index].id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 1 }}
            className="absolute flex flex-col items-center"
          >
            <p className="text-white text-xl font-bold mt-4">
              {banner[index].text}
            </p>
            <Lottie
              animationData={banner[index].animation}
              className="w-[300px] h-[300px]"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="h-[400px] flex-grow pr-5 relative ">
        <button className="absolute ml-3 top-[50%] bg-black w-9 h-9 rounded-full" onClick={previousHandler}> &#10094;</button>
        <img src={pictures[indexPic].src} alt={pictures[indexPic].alt} className="h-[400px] w-full rounded-xl"/>
        <button className="absolute top-[50%] right-5 mr-3 bg-black w-9 h-9 rounded-full" onClick={nextHandler}> &#10095;</button>
      </div>
    </div>
  );
};

export default Banner;
