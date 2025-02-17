import React from "react";
import { RiProfileLine } from "react-icons/ri";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import { AiFillProduct } from "react-icons/ai";
import { MdOutlinePayment } from "react-icons/md";
import { TbNewSection } from "react-icons/tb";
import UserPage from "./UserPage";
import SellerPage from "./SellerPage";

/*
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
  addresses: [
    {
      city: "Wien",
      street: "Grogasse",
      number: 25,
      postalCode: 1050,
    },
    {
      city: "Wien",
      street: "Anton-Gasse",
      number: 2,
      postalCode: 1210,
    },
  ],
  payments: [],
  name: "Rashin Harisi",
  username: "rashin.harisi",
  email: "rashin.aharisi1991@gmail.com",
  phone: 123456789,
  password: "$2b$12$XIubebndnZTfK4VBrAUcGu0Y2f6F6Q4MWDNkIOfF6Trlu9wtZwELC",
};*/
const user = {
  "_id": {
    "$oid": "6790c3b59bb2829f2cf386f4"
  },
  "role": "BUSINESS_MAN",
  "isVerified": true,
  "createdAt": {
    "$date": "2025-01-22T10:08:53.117Z"
  },
  "receive_payments": [],
  "name": "Rara Co.",
  "username": "rara",
  "email": "rara.myapps@gmail.com",
  "phone": 123456789,
  "business_number": 1254,
  "address": [
    {
      city: "Wien",
      street: "Grogasse",
      number: 25,
      postalCode: 1050,
    }],
  "password": "$2b$12$8bHcMAjqLaEcExYosWC3euWNFLX7N/Pi.QfnNKl.NI51xbF7wYG1G"
}
const userMenu = [
  { name: "Personal Info", component: <RiProfileLine />, id: 1 },
  { name: "Previous purchase", component: <BiPurchaseTagAlt />, id: 2 },
  { name: "Liked items", component: <FaHeart />, id: 3 },
  { name: "Change password", component: <TbLockPassword />, id: 4 },
  { name: "Logout", component: <IoMdLogOut />, id: 5 },
];
const sellerMenu = [
  { name: "Personal Info", component: <RiProfileLine />, id: 1 },
  { name: "Submit new product", component: <TbNewSection />, id: 2 },
  { name: "Submitted items ", component: <AiFillProduct />, id: 3 },
  { name: "Payments", component: <MdOutlinePayment />, id: 4 },
  { name: "Change password", component: <TbLockPassword />, id: 5 },
  { name: "Logout", component: <IoMdLogOut />, id: 6 },
];

const Profile = () => {

  return (
    <>
      {user?.role === "USER" && (
        <UserPage user={user} userMenu={userMenu}/>
      )}
      {user?.role === "BUSINESS_MAN" && (
        <SellerPage user={user} sellerMenu={sellerMenu}/>
      )}
    </>
  );
};

export default Profile;
