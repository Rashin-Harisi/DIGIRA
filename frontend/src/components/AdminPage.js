import React, { useState } from "react";
import useUser from "../hooks/useUser";
import clsx from "clsx";
import WaitingList from "./WaitingList";
import SellerList from "./SellerList";



const AdminPage = () => {
  const [waitingListClicked, setWaitingListClicked] = useState(true);
  const [sellerClicked, setSellerClicked] = useState(false);
  const user = useUser();
  
 
  if (user?.role !== "ADMIN") {
    return <p>You are not authorized. </p>;
  }

  return (
    <div>
      <div className="border w-[95%] mx-auto flex flex-col sm:flex-row pt-3 rounded-xl">
        <div className="sm:w-[50%] pl-3">
          <p>
            Name : <span>{user.name}</span>{" "}
          </p>
          <p
            className={clsx(`text-red-500 mt-[20px]`, {
              "text-green-400": user?.isVerified,
            })}
          >
            Verified
          </p>
        </div>
        <div className="sm:w-[50%] pl-3">
          <p>Privilege : ADMIN</p>
          <div className="flex gap-5">
            <button
              className={clsx(`w-[150px] border border-[#ECF39E] rounded-md my-[20px] hover:bg-[#90A955] transition duration-300]`, { "bg-[#90A955]": waitingListClicked })}
              onClick={() =>{ 
                setWaitingListClicked(true)
                setSellerClicked(false)
            }}
            >
              Waiting List
            </button>
            <button
              className={clsx(`w-[150px] border border-[#ECF39E] rounded-md my-[20px] hover:bg-[#90A955] transition duration-300]`, { "bg-[#90A955]": sellerClicked })}
              onClick={() => {
                setSellerClicked(true)
                setWaitingListClicked(false)
            }}
            >
              Sellers
            </button>
           
          </div>
        </div>
      </div>
      {waitingListClicked && <WaitingList />}
      {sellerClicked && <SellerList />}
    </div>
  );
};

export default AdminPage;
