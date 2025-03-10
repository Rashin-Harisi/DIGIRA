import React from "react";
import useUser from "../../hooks/useUser";
import { CgProfile } from "react-icons/cg";
import { CiShoppingCart } from "react-icons/ci";

const Layout = ({ children }) => {
  const user = useUser();

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
              <div>
                <a href="/cart">
                  <CiShoppingCart />
                </a>
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
