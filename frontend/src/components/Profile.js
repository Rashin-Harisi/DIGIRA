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
import useUser from "../hooks/useUser";


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
  const user = useUser();
  //console.log(user)
  return (
    <>
      {user?.role === "USER" && <UserPage user={user} userMenu={userMenu} />}
      {user?.role === "BUSINESS_MAN" && (
        <SellerPage user={user} sellerMenu={sellerMenu} />
      )}
    </>
  );
};

export default Profile;
