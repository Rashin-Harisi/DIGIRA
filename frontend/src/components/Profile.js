import React from "react";
import { RiProfileLine } from "react-icons/ri";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { FaHeart } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
import { IoMdLogOut } from "react-icons/io";
import { AiFillProduct } from "react-icons/ai";
import { MdOutlinePayment } from "react-icons/md";
import UserPage from "./UserPage";
import SellerPage from "./SellerPage";


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
};
const userMenu = [
  { name: "Personal Info", component: <RiProfileLine />, id: 1 },
  { name: "Previous purchase", component: <BiPurchaseTagAlt />, id: 2 },
  { name: "Liked items", component: <FaHeart />, id: 3 },
  { name: "Change password", component: <TbLockPassword />, id: 4 },
  { name: "Logout", component: <IoMdLogOut />, id: 5 },
];
const sellerMenu = [
  { name: "Personal Info", component: <RiProfileLine />, id: 1 },
  { name: "Submitted items ", component: <AiFillProduct />, id: 2 },
  { name: "Payments", component: <MdOutlinePayment />, id: 3 },
  { name: "Change password", component: <TbLockPassword />, id: 4 },
  { name: "Logout", component: <IoMdLogOut />, id: 5 },
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
