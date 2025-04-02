import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const Signin = () => {
  const setUser = useUserStore((state) => state.setUser);
  const setToken = useUserStore((state) => state.setToken);
  const navigate = useNavigate();
  const [forgetPasswordClicked, setForgetPasswordClicked] = useState(false);
  const [optSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPass, setNewPass] = useState("");

  const signinSubmit = async (e) => {
    e.preventDefault();
    const info = e.target;
    const request = {
      email: info.email.value,
      password: info.password.value,
    };
    const response = await fetch("http://localhost:5001/signin", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (data.status) {
      setToken(data.token);
      setUser(data.data);
      navigate("/");
    }
  };

  const passwordRecovery = async () => {
    const response = await fetch("http://localhost:5001/passwordRecovery", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.success) {
      setOtpSent(true);
      console.log(data.message);
    } else {
      console.log(data.message);
    }
  };
  const newPasswordSet = async () => {
    const response = await fetch("http://localhost:5001/passwordRecovery", {
      method: "PATCH",
      body: JSON.stringify({ email, otp, newPass }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.success) {
      setForgetPasswordClicked(false);
      setOtpSent(false);
      setEmail("");
      setOtp("");
      setNewPass("");
      console.log(data.message);
    } else {
      console.log(data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="my-[20px] text-2xl font-bold">Signin Form</h1>
      <div className="border border-[#ECF39E] w-[85%] md:w-[50%] h-[90%] pb-[20px]">
        <form onSubmit={signinSubmit} className="">
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Email</legend>
            <input
              id="email"
              type="text"
              placeholder="John@gmail.com"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Password</legend>
            <input
              id="password"
              type="password"
              placeholder="******"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[150px] border border-[#ECF39E] rounded-md mt-[20px] hover:bg-[#90A955] transition duration-300]"
              onClick={() => {}}
            >
              Signin
            </button>
          </div>
        </form>
      </div>
      <div>
        <p
          className="my-5 text-center text-[#CCFF33] italic text-sm cursor-pointer"
          onClick={() => setForgetPasswordClicked(true)}
        >
          Forget your password ?
        </p>
        <p className="my-[20px]">
          You don't have any account yet.{" "}
          <Link to="/signup" className="text-[#CCFF33]">
            Signup
          </Link>
        </p>
      </div>
      <Dialog
        open={forgetPasswordClicked}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => setForgetPasswordClicked(false)}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="font-medium text-white text-base/7"
              >
                Password Recovery
              </DialogTitle>
              <p className="mt-2 mb-3 text-sm text-white">
                Please enter your email address:
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex. john.doe@gamil.com"
                className="w-full px-3 rounded-xl"
              />
              <div className="mt-4">
                <Button
                  onClick={passwordRecovery}
                  className="inline-flex items-center gap-2 rounded-xl bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                >
                  Submit
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={optSent}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => setForgetPasswordClicked(false)}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="font-medium text-white text-base/7"
              >
                Password Recovery
              </DialogTitle>
              <p className="mt-2 mb-3 text-sm text-white">
                The code is sent to your email address. Please enter your otp
                code and new password:
              </p>
              <input
                type="number"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the otp code here"
                className="w-full px-3 mb-3 rounded-xl"
              />
              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Enter the new password here"
                className="w-full px-3 rounded-xl"
              />
              <div className="mt-4">
                <Button
                  onClick={newPasswordSet}
                  className="inline-flex items-center gap-2 rounded-xl bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                >
                  Submit
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Signin;
