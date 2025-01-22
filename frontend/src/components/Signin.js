import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';

const Signin = () => {
  const setUser = useUserStore((state) => state.setUser);
  const setToken = useUserStore((state)=>state.setToken)
  const navigate = useNavigate();

  const signinSubmit = async(e)=>{
    e.preventDefault();
    const info = e.target;
    const request = {
      email : info.email.value,
      password: info.password.value
    }
    const response= await fetch('http://localhost:5000/signin',{
      method: "POST",
      body: JSON.stringify(request),
      headers: {
          "Content-Type" : "application/json"
      }
    })
    const data = await response.json();
  
    if(data.status){
      setToken(data.token)
      setUser(data.data)
      navigate('/')
    }
  }
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <h1 className='my-[20px] text-2xl font-bold'>Signin Form</h1>
      <div className="border border-[#ECF39E] w-[85%] md:w-[50%] h-[90%] pb-[20px]">
        <form onSubmit={signinSubmit}>
         
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Email</legend>
            <input
            id='email'
              type="text"
              placeholder="John@gmail.com"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <fieldset className="border border-[#ECF39E] w-[90%] m-auto rounded-md my-[10px]">
            <legend className="px-[10px]">Password</legend>
            <input
            id='password'
              type="password"
              placeholder="******"
              className="w-[95%] mx-[2.5%] px-[10px]"
            />
          </fieldset>
          <div className="flex justify-center">
            <button
              type="submit"
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