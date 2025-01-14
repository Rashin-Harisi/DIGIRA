import React, { useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

const Signup = () => {
  const [role, setRole] = useState("");
  const [clicked, setClicked] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const buttons = ["User", "Business", "Admin"];

  return (
    <div className="w-full flex flex-col justify-center items-center">
        <h1 className='my-[20px] text-2xl font-bold'>Signup Form</h1>
      <div className="border border-[#ECF39E] w-[85%] md:w-[50%] h-[90%] pb-[20px]">
        <div className="flex justify-around border-b border-[#ECF39E] py-[10px]">
          {buttons.map((label, index) => (
            <button
            key={index}
              disabled={isSubmitted}
              className={clsx("signup_buttons", {
                "bg-[#90A955]": clicked === index,
              })}
              onClick={() => {
                setRole(label.toLowerCase());
                setClicked(index);
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <form
          id="user"
          className={clsx("", {
            hidden: buttons[clicked].toLowerCase() !== "user" || isSubmitted,
          })}
        >
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Name</legend>
            <input
              type="text"
              placeholder="ex. John Doe"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Username</legend>
            <input
              type="text"
              placeholder="ex. John-Doe"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Email</legend>
            <input
              type="email"
              placeholder="ex. John@gmail.com"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Phone Number</legend>
            <input
              type="number"
              placeholder="ex. +4300000000"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Password</legend>
            <input
              type="password"
              placeholder="ex. John Doe"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <div className="flex justify-center">
            <button
              type="button"
              className="w-[150px] border border-[#ECF39E] rounded-md mt-[20px] hover:bg-[#90A955] transition duration-300]"
              onClick={() => {
                setIsSubmitted(true);
              }}
            >
              Register
            </button>
          </div>
        </form>
        <form
          id="seller"
          className={clsx("overflow-y-scroll h-[90%]", {
            hidden:
              buttons[clicked].toLowerCase() !== "business" || isSubmitted,
          })}
        >
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Business's Name</legend>
            <input
              type="text"
              placeholder="ex. Philips"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Username</legend>
            <input
              type="text"
              placeholder="ex. Philips.Co"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Business Email</legend>
            <input
              type="email"
              placeholder="ex. support@philips.com"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Phone Number</legend>
            <input
              type="number"
              placeholder="ex. +4300000000"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Business's Address</legend>
            <input
              type="text"
              placeholder="ex. Floridsdorf-Wien "
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">ÖNACE</legend>
            <input
              type="number"
              placeholder="ex. 6201"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Password</legend>
            <input
              type="password"
              placeholder="ex. John Doe"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <div className="flex justify-center">
            <button
              type="button"
              className="w-[150px] border border-[#ECF39E] rounded-md my-[20px] hover:bg-[#90A955] transition duration-300]"
              onClick={() => {
                setIsSubmitted(true);
              }}
            >
              Register
            </button>
          </div>
        </form>
        <form
          id="admin"
          className={clsx("", {
            hidden: buttons[clicked].toLowerCase() !== "admin" || isSubmitted,
          })}
        >
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Name</legend>
            <input
              type="text"
              placeholder="ex. John Doe"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Username</legend>
            <input
              type="text"
              placeholder="ex. John-Doe"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Email</legend>
            <input
              type="email"
              placeholder="ex. Admin@gmail.com"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Phone Number</legend>
            <input
              type="number"
              placeholder="ex. +4300000000"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Password</legend>
            <input
              type="password"
              placeholder="ex. John Doe"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <div className="flex justify-center">
            <button
              type="button"
              className="w-[150px] border border-[#ECF39E] rounded-md mt-[20px] hover:bg-[#90A955] transition duration-300]"
              onClick={() => {
                setIsSubmitted(true);
              }}
            >
              Register
            </button>
          </div>
        </form>
        <form
          id="email_verification"
          className={clsx("", { hidden: !isSubmitted })}
        >
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Email</legend>
            <input
              type="email"
              placeholder="ex. John@gmail.com"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Verification Code</legend>
            <input
              type="email"
              placeholder="ex. 12345"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <div className="flex justify-center">
            <button
              type="button"
              className="w-[150px] border border-[#ECF39E] rounded-md mt-[20px] hover:bg-[#90A955] transition duration-300]"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
      <p className="my-[20px]">
        You've already have an account? <Link to="/signin" className="text-[#CCFF33]" onClick={(event)=>{
            if(isSubmitted)event.preventDefault(); 
        }}>Signin</Link>
      </p>
    </div>
  );
};

export default Signup;
