import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import clsx from "clsx";
import WaitingList from "./WaitingList";
import SellerList from "./SellerList";

const AdminPage = () => {
  const [waitingListClicked, setWaitingListClicked] = useState(true);
  const [sellerClicked, setSellerClicked] = useState(false);
  const user = {
    _id: {
      $oid: "678d07aeb4d06a4bd426bbc2",
    },
    role: "ADMIN",
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
  //const user = useUser();
  if (user.role !== "ADMIN") {
    return <p>You are not authorized. </p>;
  }

  return (
    <div>
      <div className="border w-[95%] mx-auto flex pt-3 rounded-xl">
        <div className="w-[50%] pl-3">
          <p>
            Name : <span>{user.name}</span>{" "}
          </p>
          <p
            className={clsx(`text-red-500 mt-[20px]`, {
              "text-green-300": user.isVerified,
            })}
          >
            Verified
          </p>
        </div>
        <div className="w-[50%]">
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
