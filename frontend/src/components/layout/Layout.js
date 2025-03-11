import React, { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";
import { CgProfile } from "react-icons/cg";
import { CiShoppingCart } from "react-icons/ci";
import clsx from "clsx";
import useUserStore from "../../store/userStore";
import { AiOutlineLogout } from "react-icons/ai";
import { totalQuantity } from "../../utils/functions";

const Layout = ({ children }) => {
  //const user = useUser();
  const logout = useUserStore((state) => state.logout);
  const user = useUserStore((state) => state.user);
  const [quantity,setQuantity] = useState(0)
  const userEmail = "rashin.aharisi1991@gmail.com"
  console.log(quantity)
  useEffect(()=>{
    const cart = JSON.parse(localStorage.getItem("cart")) 
    const userCart = cart[userEmail] || {}
    const total = Object.values(userCart).reduce((sum, quantity) => sum + quantity, 0)
    setQuantity(total)
    
  },[])
  //console.log(quantity)
  return (
    <div className="w-[95vw] m-auto my-[20px] bg-[#132A12] px-[10px] flex flex-col">
      <header className="w-full h-[100px] sm:h-[150px] border-b border-[#ECF39E] flex">
        <div className="mx-5 my-auto">
          <a href="/">
            <img
              src="logo.png"
              alt="logo"
              className="rounded-full "
              width={130}
            />
          </a>
        </div>
        <div className="flex items-center justify-center w-full px-5">
          <p className="w-[70%] hidden sm:block font-custom italic text-xl md:text-2xl lg:text-4xl font-light transition-transform hover:animate-shake ">
            {" "}
            Try our website to experience smooth purchase
          </p>

          {user ? (
            <div className="flex gap-5 text-2xl">
              <a href="/profile">
                <CgProfile />
              </a>
              <div className={clsx("relative", { hidden: user?.role === "ADMIN" })}>
                <a href="/cart">
                  <CiShoppingCart />
                </a>
                <span className={clsx("absolute w-5 h-5 text-sm text-center border rounded-full -right-4 -top-3",{})}>{quantity}</span>
              </div>
              <div className={clsx("", { hidden: user?.role !== "ADMIN" })}>
                <button onClick={() => logout()}>
                  <AiOutlineLogout />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-5">
              <a
                href="/signin"
                className="border rounded-xl w-[50px] text-sm sm:text-base sm:w-[80px] text-center transition-transform hover:animate-shake hover:bg-[#ECF39E] hover:border-[#ECF39E] hover:text-[#132A12]"
              >
                Signin
              </a>
              <a
                href="/signup"
                className="border rounded-xl w-[50px] text-sm sm:text-base sm:w-[80px] text-center transition-transform hover:animate-shake hover:bg-[#ECF39E] hover:border-[#ECF39E] hover:text-[#132A12]"
              >
                signup
              </a>
            </div>
          )}
        </div>
      </header>
      <div className="flex-grow py-4">{children}</div>
      <footer className="w-full h-[50px] border-t border-[#ECF39E]">
        footer
      </footer>
    </div>
  );
};

export default Layout;
