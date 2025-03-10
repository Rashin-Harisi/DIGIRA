import clsx from "clsx";
import React, { useEffect, useState } from "react";
import SellerPersonalInfo from "./SellerPersonalInfo";
import ProductCardInSellerPage from "./ProductCardInSellerPage";
import SubmitProduct from "./SubmitProduct";
import useProducts from "../hooks/useProducts"

const SellerPage = ({ user, sellerMenu }) => {
  const {products} = useProducts();
  const [index, setIndex] = useState(1);
  const [passwordChanging, setPasswordChanging] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const productList = products.filter(
    (product) => product.sellerId === user._id
  );

  const clickHandler = (id) => {
    setIndex(id);
  };
  const handleChange = (field, value) => {
    setPasswordChanging((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const changePasswordHandler = async (e) => {
    e.preventDefault();
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
  useEffect(() => {
    if (index === 6) {
      console.log("logged out");
    }
  }, [index]);
  return (
    <div className="flex gap-5 ">
      <div className="flex flex-col border rounded-xl">
        <div className="h-[100px] px-5 border-b flex flex-col justify-center items-center gap-2">
          <div className="border w-11 h-11 text-center rounded-full text-3xl bg-[#ECF39E] text-[#31572C]">
            {user.name.charAt(0)}
          </div>
          <p>{user.name}</p>
        </div>
        {sellerMenu.map((item) => (
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
        {index === 1 && <SellerPersonalInfo user={user} />}
        {index === 2 && <SubmitProduct user={user} />}
        {index === 3 && (
          <div className="flex flex-col gap-4">
            {productList.map((product,index) => (
              <ProductCardInSellerPage product={product} key={index}/>
            ))}
          </div>
        )}
        {index === 4 && <div>Payments</div>}
        {index === 5 && (
          <form
            onSubmit={changePasswordHandler}
            className="flex flex-col gap-4 w-[500px] h-[150px] relative"
          >
            <div className="flex gap-4">
              <label htmlFor="currentPassword">Current Password : </label>
              <input
                id="currentPassword"
                type="password"
                value={passwordChanging.currentPassword}
                onChange={(e) =>
                  handleChange("currentPassword", e.target.value)
                }
              />
            </div>
            <div className="flex gap-4">
              <label htmlFor="newPassword">New Password : </label>
              <input
                id="newPassword"
                type="password"
                value={passwordChanging.newPassword}
                onChange={(e) => handleChange("newPassword", e.target.value)}
              />
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

export default SellerPage;
