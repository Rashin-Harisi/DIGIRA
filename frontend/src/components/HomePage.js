import React, { useEffect } from "react";
import Banner from "./Banner";
import ProductsPage from "./ProductsPage";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/userStore";
import fetchUserProfile from "../utils/fetchUserProfile";



const HomePage = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
 
  useEffect(()=>{
    const user = (async()=>{ 
      const userInfo = await fetchUserProfile()
      if(userInfo){
        setUser(userInfo)
        //console.log(userInfo);
      }else{
        navigate('/signin')
      }
    })
    user();
  },[])
 
  return (
    <div>
      <Banner />
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-gray-500">PRODUCTS</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {user && <ProductsPage user={user}/>}
    </div>
  );
};

export default HomePage;
