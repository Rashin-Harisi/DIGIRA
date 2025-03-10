import React, { useEffect, useState } from "react";
import clsx from "clsx";
import PersonalInfo from "./PersonalInfo";
import ProductCardInHomePage from "./ProductCardInHomePage";
import useProducts from "../hooks/useProducts";

const UserPage = ({ user, userMenu }) => {
  const {products} = useProducts();
  const [index, setIndex] = useState(1);
  const [passwordChanging, setPasswordChanging] = useState({
    currentPassword: "",
    newPassword: "",
  });
  
  const handleChange = (field, value) => {
    setPasswordChanging((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const clickHandler = (id) => {
    setIndex(id);
  };
  const productsList = products?.filter((product) =>
    product.stars.includes(user._id)
  );

  const changePasswordHandler = async(e) => {
    e.preventDefault();
    console.log(passwordChanging);
    const response= await fetch('http://localhost:5001/changePassword',{
      method: "PATCH",
      body: JSON.stringify({passwordChanging, userId : user._id}),
      headers: {
          "Content-Type" : "application/json"
      }
    })
      const data = await response.json()
      if(data.status){
        console.log(data.message)  
      }else{
        console.log("There is a problem in changing the password.")
        }
      
  };


  useEffect(()=>{
    if(index === 5){
        console.log("logged out");
    }
  },[index])

  return (
    <div className="flex gap-5 ">
      <div className="flex flex-col border rounded-xl">
        <div className="h-[100px] px-5 border-b flex flex-col justify-center items-center gap-2">
          <div className="border w-11 h-11 text-center rounded-full text-3xl bg-[#ECF39E] text-[#31572C]">
            {user.name.charAt(0)}
          </div>
          <p>{user.name}</p>
        </div>
        {userMenu.map((item) => (
          <div
            key={item.id}
            className={clsx(
              "flex justify-center items-center gap-3 h-[70px] px-5 border-b",
              { "bg-[#ECF39E] text-[#31572C]": index === item.id }
            )}
            onClick={() => clickHandler(item.id)}
          >
            <span>{item.component}</span>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
      <div className="flex-grow">
        {index === 1 && <PersonalInfo user={user} />}
        {index === 2 && <div> previous purchase</div>}
        {index === 3 && (
          <div className="flex flex-wrap justify-around gap-5">
            {productsList.length !== 0 &&
              productsList.map((product, index) => (
                <ProductCardInHomePage key={index} product={product} />
              ))}
          </div>
        )}
        {index === 4 && (
          <form
            onSubmit={changePasswordHandler}
            className="flex flex-col gap-4 w-[500px] h-[150px] relative"
          >
            <div className="flex gap-4">
              <label htmlFor="currentPassword">Current Password : </label>
              <input
                id="currentPassword"
                value={passwordChanging.currentPassword}
                onChange={(e) =>
                  handleChange("currentPassword", e.target.value)
                }
              />
            </div>
            <div className="flex gap-4">
              <label htmlFor="newPassword">New Password : </label>
              <input id="newPassword" value={passwordChanging.newPassword} onChange={(e) =>
                  handleChange("newPassword", e.target.value)
                }/>
            </div>
            <button
              type="submit"
              className="w-[150px] border rounded-xl absolute right-0 bottom-3 "
            >
              Change password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserPage;
