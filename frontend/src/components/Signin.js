import React from 'react'
import { Link } from 'react-router-dom';

const Signin = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className='my-[20px] text-2xl font-bold'>Signin Form</h1>
      <div className="border border-[#ECF39E] w-[85%] md:w-[50%] h-[90%] pb-[20px]">
        <form
          id="user"
        >
         
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Username or Email</legend>
            <input
              type="text"
              placeholder="ex. John-Doe or John@gmail.com"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Password</legend>
            <input
              type="password"
              placeholder="******"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <div className="flex justify-center">
            <button
              type="button"
              className="w-[150px] border border-[#ECF39E] rounded-md mt-[20px] hover:bg-[#90A955] transition duration-300]"
              onClick={() => {
                
              }}
            >
              Signin
            </button>
          </div>
        </form>
      </div>
      <p className="my-[20px]">
        You don't have any account yet. <Link to="/signup" className="text-[#CCFF33]">Signup</Link>
      </p>
    </div>
  )
}

export default Signin