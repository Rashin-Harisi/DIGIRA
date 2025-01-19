import React, { useState } from "react";
import clsx from "clsx";
import { Link,useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore"

const Signup = () => {
  const [clicked, setClicked] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const buttons = ["User", "Business", "Admin"];
  const setUser = useUserStore((state) => state.setUser);
  const role = useUserStore((state) => state.role);
  const navigate = useNavigate();

  
  
  const userSubmit = async(e)=>{
    e.preventDefault();
    const userDetails = e.target
    const newUser={
      role: "USER",
      name : userDetails.name.value,
      username : userDetails.username.value,
      email: userDetails.email.value,
      password:userDetails.password.value,
      phone: userDetails.phoneNumber.value,
    }
    const response= await fetch('http://localhost:5000/signup',{
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
          "Content-Type" : "application/json"
      }
    })
    const data = await response.json();
    console.log(data);
    if(data.status){
      setIsSubmitted(true);
      setUser(data.data)
    }
  }
  const sellerSubmit = async(e)=>{
    e.preventDefault();
    const sellerDetails = e.target
    const newSeller={
      role: "BUSINESS_MAN",
      name: sellerDetails.name_seller.value,
      username:sellerDetails.username_seller.value,
      email:sellerDetails.email_seller.value,
      password: sellerDetails.password_seller.value,
      phone:sellerDetails.phoneNumber_seller.value,
      address:sellerDetails.address_seller.value,
      business_number:sellerDetails.businessNumber_seller.value,
    }
      const response= await fetch('http://localhost:5000/signup',{
        method: "POST",
        body: JSON.stringify(newSeller),
        headers: {
            "Content-Type" : "application/json"
        }
      })
      const data = await response.json();
      if(data.status){
        setIsSubmitted(true);
        setUser(data.data)
      }

  }
  const adminSubmit = async(e)=>{
    e.preventDefault();
    const adminDetails = e.target
    const newAdmin={
      role: "ADMIN",
      name : adminDetails.name_admin.value,
      username : adminDetails.username_admin.value,
      email: adminDetails.email_admin.value,
      password:adminDetails.password_admin.value,
      phone: adminDetails.phoneNumber_admin.value,
    }
    const response= await fetch('http://localhost:5000/signup',{
      method: "POST",
      body: JSON.stringify(newAdmin),
      headers: {
          "Content-Type" : "application/json"
      }
    })
    const data = await response.json();
    if(data.status ){
      setIsSubmitted(true);
      setUser(data.data)
    }
    
  }

  const verificationSubmit =async(e)=>{
    e.preventDefault();
    const verificationDetail = e.target;
    const verifiedCode = {
      role:role,
      email: verificationDetail.email_verify.value,
      otp: verificationDetail.code_verify.value,
    }
    const response= await fetch('http://localhost:5000/verifyotp',{
      method: "POST",
      body: JSON.stringify(verifiedCode),
      headers: {
          "Content-Type" : "application/json"
      }
    })
    const data = await response.json();
    console.log(data);
    if(data.status){
      setUser(data.data)
      navigate("/")
    }

  }
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
          onSubmit={userSubmit}
        >
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Name</legend>
            <input
              id='name'
              type="text"
              placeholder="ex. John Doe"
              className="w-[95%] mx-[2.5%] px-[10px] text-black"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Username</legend>
            <input
              id='username'
              type="text"
              placeholder="ex. John-Doe"
              className="w-[95%] mx-[2.5%] px-[10px] text-black"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Email</legend>
            <input
              id='email'
              type="email"
              placeholder="ex. John@gmail.com"
              className="w-[95%] mx-[2.5%] px-[10px] text-black"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Phone Number</legend>
            <input
              id='phoneNumber'
              type="number"
              placeholder="ex. +4300000000"
              className="w-[95%] mx-[2.5%] px-[10px] text-black"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Password</legend>
            <input
              id="password"
              type="password"
              placeholder="ex. John Doe"
              className="w-[95%] mx-[2.5%] px-[10px] text-black"
            />
          </fieldset>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[150px] border border-[#ECF39E] rounded-md mt-[20px] hover:bg-[#90A955] transition duration-300]"
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
          onSubmit={sellerSubmit}
        >
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Business's Name</legend>
            <input
              id='name_seller'
              type="text"
              placeholder="ex. Philips"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Username</legend>
            <input
              id='username_seller'
              type="text"
              placeholder="ex. Philips.Co"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Business Email</legend>
            <input
              id='email_seller'
              type="email"
              placeholder="ex. support@philips.com"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Phone Number</legend>
            <input
              id='phoneNumber_seller'
              type="number"
              placeholder="ex. +4300000000"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Business's Address</legend>
            <input
              id='address_seller'
              type="text"
              placeholder="ex. Floridsdorf-Wien "
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">ÖNACE</legend>
            <input
              id='businessNumber_seller'
              type="number"
              placeholder="ex. 6201"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Password</legend>
            <input
              id="password_seller"
              type="password"
              placeholder="ex. John Doe"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[150px] border border-[#ECF39E] rounded-md my-[20px] hover:bg-[#90A955] transition duration-300]"
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
          onSubmit={adminSubmit}
        >
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Name</legend>
            <input
              id='name_admin'
              type="text"
              placeholder="ex. John Doe"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Username</legend>
            <input
              id="username_admin"
              type="text"
              placeholder="ex. John-Doe"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Email</legend>
            <input
              id='email_admin'
              type="email"
              placeholder="ex. Admin@gmail.com"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Phone Number</legend>
            <input
              id='phoneNumber_admin'
              type="number"
              placeholder="ex. +4300000000"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Password</legend>
            <input
              id='password_admin'
              type="password"
              placeholder="ex. John Doe"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[150px] border border-[#ECF39E] rounded-md mt-[20px] hover:bg-[#90A955] transition duration-300]"
            >
              Register
            </button>
          </div>
        </form>
        <form
          id="email_verification"
          className={clsx("", { hidden: !isSubmitted })}
          onSubmit={verificationSubmit}
        >
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Email</legend>
            <input
            id="email_verify"
              type="email"
              placeholder="ex. John@gmail.com"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Verification Code</legend>
            <input
            id="code_verify"
              type="number"
              placeholder="ex. 12345"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <div className="flex justify-center">
            <button
              type="submit"
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
