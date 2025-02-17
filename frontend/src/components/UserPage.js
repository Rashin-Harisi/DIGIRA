import React, { useEffect, useState } from "react";
import clsx from "clsx";
import PersonalInfo from "./PersonalInfo";
import ProductCardInHomePage from "./ProductCardInHomePage";

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
    __v: 0,
  },
];
const UserPage = ({ user, userMenu }) => {
  const [index, setIndex] = useState(1);
  const [passwordChanging, setPasswordChanging] = useState({
    currentPassword: "",
    newPassword: "",
  });
  
  const handleChange = (field, value) => {
    setPasswordChanging((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const clickHandler = (id) => {
    setIndex(id);
  };
  const productsList = products.filter((product) =>
    product.stars.includes(user._id.$oid)
  );

  const changePasswordHandler = (e) => {
    e.preventDefault();
    console.log(passwordChanging);
  };
  useEffect(()=>{
    if(index === 5){
        console.log("logged out");
    }
  },[index])

  return (
    <div className="flex gap-5 ">
      <div className="border rounded-xl flex flex-col">
        <div className="h-[100px] px-5 border-b flex flex-col justify-center items-center gap-2">
          <div className="border w-11 h-11 text-center rounded-full text-3xl bg-[#ECF39E] text-[#31572C]">
            {user.name.charAt(0)}
          </div>
          <p>{user.name}</p>
        </div>
        {userMenu.map((item) => (
          <div
            key={item.id}
            className={clsx(
              "flex justify-center items-center gap-3 h-[70px] px-5 border-b",
              { "bg-[#ECF39E] text-[#31572C]": index === item.id }
            )}
            onClick={() => clickHandler(item.id)}
          >
            <span>{item.component}</span>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <div className="flex-grow">
        {index === 1 && <PersonalInfo user={user} />}
        {index === 2 && <div> previous purchase</div>}
        {index === 3 && (
          <div className="flex gap-5 flex-wrap justify-around">
            {productsList.length !== 0 &&
              productsList.map((product, index) => (
                <ProductCardInHomePage key={index} product={product} />
              ))}
          </div>
        )}
        {index === 4 && (
          <form
            onSubmit={changePasswordHandler}
            className="flex flex-col gap-4 w-[500px] h-[150px] relative"
          >
            <div className="flex gap-4">
              <label htmlFor="currentPassword">Current Password : </label>
              <input
                id="currentPassword"
                value={passwordChanging.currentPassword}
                onChange={(e) =>
                  handleChange("currentPassword", e.target.value)
                }
              />
            </div>
            <div className="flex gap-4">
              <label htmlFor="newPassword">New Password : </label>
              <input id="newPassword" value={passwordChanging.newPassword} onChange={(e) =>
                  handleChange("newPassword", e.target.value)
                }/>
            </div>
            <button
              type="submit"
              className="w-[150px] border rounded-xl absolute right-0 bottom-3 "
            >
              Change password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserPage;
