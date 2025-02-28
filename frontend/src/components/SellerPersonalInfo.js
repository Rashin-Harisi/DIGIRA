import React, { useState } from "react";
import clsx from "clsx";
import { CiEdit } from "react-icons/ci";
import { FaCheck } from "react-icons/fa6";
import { CiCircleRemove } from "react-icons/ci";

const SellerPersonalInfo = ({ user }) => {
  const [editClicked, setEditClicked] = useState(false);
  const [addAddressClicked, setAddAddressClicked] = useState(false);
  const [editedData, setEditedDate] = useState({
    addresses: user.addresses,
    name: user.name,
    username: user.username,
    phone: user.phone,
  });

  const [newAddress, setNewAddress] = useState({
    city: "",
    street: "",
    number: 0,
    postalCode: 0,
  });

  const handleChange = (field, value) => {
    setEditedDate((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const newAddressSubmit = async(e) => {
    e.preventDefault();
    if(e.target.city.value === "" || e.target.street.value === "" || e.target.number.value===0 || e.target.postalCode.value===0){
      alert("PLease fill all fields.")
    }
    const new_address = {
      city: e.target.city.value,
      street: e.target.street.value,
      number: e.target.number.value,
      postalCode: e.target.postalCode.value,
    };
    setNewAddress(new_address)
    setAddAddressClicked(false); 
    const response= await fetch('http://localhost:5001/addNewAddress',{
    method: "POST",
    body: JSON.stringify({userId: user._id, new_address: new_address}),
    headers: {
        "Content-Type" : "application/json"
    }
  })
    const data = await response.json();
    console.log(data)
    if(data.status){
      console.log(data.message)
    }else{
      console.log("There is a problem in adding new address.")
    }
    
  };
  const submitHandler = async()=>{
    //body: userId, editedData
    const response= await fetch('http://localhost:5001/editPersonalInfo',{
      method: "PATCH",
      body: JSON.stringify({userId: user._id, editedData}),
      headers: {
          "Content-Type" : "application/json"
      }
    })
      const data = await response.json();
      
      if(data.status){
        console.log(data.message)
      }else{
        console.log("There is a problem in editing personal Info.")
      }
  }
  const handleAddressChange = (index, field, value) => {
    setEditedDate((prev) => ({
      ...prev,
      addresses: prev.addresses.map((address, i) =>
        i === index ? { ...address, [field]: value } : address
      ),
    }));
  };
  const removeAddress=async (index,address)=>{
    //body: userId, index, address
   const response= await fetch('http://localhost:5001/removeAddress',{
     method: "PATCH",
     body: JSON.stringify({userId: user._id, index, address}),
     headers: {
         "Content-Type" : "application/json"
     }
   })
     const data = await response.json();
     if(data.status){
       console.log(data.message)
     }else{
       console.log("There is a problem in removing an address.")
     }
 }

  return (
    <div className="relative flex flex-col gap-4 py-5 px-5 w-[90%]">
      <p>
        Name :{" "}
        <span>
          {editClicked ? (
            <input
              className="input_profile"
              value={editedData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          ) : (
            user.name
          )}
        </span>
      </p>
      <p>
        ÖNACE : <span>{user.business_number}</span>
      </p>
      <p>
        Username :{" "}
        <span>
          {editClicked ? (
            <input
              className="input_profile"
              value={editedData.username}
              onChange={(e) => handleChange("username", e.target.value)}
            />
          ) : (
            user.username
          )}
        </span>
      </p>
      <p>
        Email : <span>{user.email}</span>
      </p>
      <p className={clsx("", { "text-green-400": user.isVerified })}>
        Verified
      </p>
      <div>
        Address :{" "}
        <div className="flex flex-col gap-2 pl-[60px]">
          {editClicked ? (
            <div>
              {editedData.addresses.map((address, index) => (
                <form
                  key={index}
                  className="flex w-full gap-3 items-center my-2"
                >
                  <div className="flex  gap-2">
                    <label htmlFor="city">City</label>
                    <input
                      id="city"
                      className="rounded-xl pl-3 w-[120px]"
                      value={address.city}
                      onChange={(e) =>
                        handleAddressChange(index, "city", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex gap-2">
                    <label htmlFor="street">Street</label>
                    <input
                      id="street"
                      className="rounded-xl pl-3 w-[120px]"
                      value={address.street}
                      onChange={(e) =>
                        handleAddressChange(index, "street", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex gap-2">
                    <label htmlFor="number">Number</label>
                    <input
                      id="number"
                      className="rounded-xl pl-3 w-[70px]"
                      value={address.number}
                      onChange={(e) =>
                        handleAddressChange(index, "number", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex gap-2">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                      id="postalCode"
                      className="rounded-xl pl-3 w-[70px]"
                      value={address.postalCode}
                      onChange={(e) =>
                        handleAddressChange(index, "postalCode", e.target.value)
                      }
                    />
                  </div>
                </form>
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              {user && user.addresses.map((address, index) => (
                <div key={index} className="flex gap-5">
                  <span>
                    {address.number} - {address.street} - {address.city} /{" "}
                    {address.postalCode}
                  </span>
                  <button
                    className="text-red-500"
                    onClick={() => removeAddress(index, address)}
                  >
                    <CiCircleRemove />
                  </button>
                </div>
              ))}
              {newAddress.city !== "" &&
                newAddress.street !== "" &&
                newAddress.number !== 0 &&
                newAddress.postalCode !== 0 && (
                  <span>
                    {newAddress.number} - {newAddress.street} -{" "}
                    {newAddress.city} / {newAddress.postalCode}
                  </span>
                )}
              {addAddressClicked && (
                <form
                  className="flex w-full gap-3 items-center my-2"
                  onSubmit={newAddressSubmit}
                >
                  <div className="flex  gap-2">
                    <label htmlFor="city">City</label>
                    <input id="city" className="rounded-xl pl-3 w-[120px]" />
                  </div>
                  <div className="flex gap-2">
                    <label htmlFor="street">Street</label>
                    <input id="street" className="rounded-xl pl-3 w-[120px]" />
                  </div>
                  <div className="flex gap-2">
                    <label htmlFor="number">Number</label>
                    <input id="number" className="rounded-xl pl-3 w-[70px]" />
                  </div>
                  <div className="flex gap-2">
                    <label htmlFor="postalCode">Postal Code</label>
                    <input
                      id="postalCode"
                      className="rounded-xl pl-3 w-[70px]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-6 h-6 rounded-full bg-[#ECF39E] text-[#31572C] text-xl text-center "
                  >
                    <FaCheck />
                  </button>
                </form>
              )}
              <button
                className="text-blue-400 underline pl-0 w-[150px]"
                onClick={() => setAddAddressClicked(true)}
              >
                {" "}
                + new address
              </button>
            </div>
          )}
        </div>
      </div>
      <p>
        Phone :{" "}
        <span>
          {editClicked ? (
            <input
              className="input_profile"
              value={editedData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          ) : (
            user.phone
          )}
        </span>
      </p>
      <p>
        Joined At : <span>{ user.createdAt.split("T")[0]}</span>
      </p>
      <button
        className="border rounded-xl w-[100px] h-[30px] absolute right-0 -mt-5 flex justify-center items-center gap-2"
        onClick={() => {
          if (editClicked) {
            console.log("submit clicked");
            submitHandler()
            setEditClicked(false);
          } else {
            setEditClicked(true);
          }
        }}
      >
        {editClicked ? (
          <>Submit</>
        ) : (
          <>
            {" "}
            <CiEdit /> Edit{" "}
          </>
        )}
      </button>
    </div>
  );
};

export default SellerPersonalInfo;
