import React, { useState, useEffect } from "react";
import cartStore from "../store/cartStore";
import useUser from "../hooks/useUser";
import useProducts from "../hooks/useProducts";
import CartItemCard from "./CartItemCard";
import { Link } from "react-router-dom";
import { calculatePrice, sumPrices } from "../utils/functions";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";

const Cart = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deliveryDialog, setDeliveryDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [paied,setPaied] = useState(false)
  const [receptian, setRecepian] = useState("yourself");
  const [time, setTime] = useState("8-11");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [newAddress, setNewAddress] = useState({
    city: "",
    street: "",
    number: "",
    postalCode: "",
  });
  const [newRecepianName, setNewRecepianName] = useState("");
  const [newRecepianPhone, setNewRecepianPhone] = useState("");
  const [cart, setCart] = useState({});
  const [startDate, setStartDate] = useState(new Date());
  const getCart = cartStore((state) => state.getCartForUser);
  const quantity = cartStore((state) => state.quantity);
  const clear = cartStore((state) => state.clearCart);
  const user = useUser();
  const userEmail = user?.email;
  const { products } = useProducts();
  const [deliveryInfo, setDeliveryInfo] = useState({
    date: "",
    time: "",
    phone: "",
    name: "",
    address: "",
  });
  
  const cartItems = products.filter((product) =>
    cart.hasOwnProperty(product._id)
  );
  const updatedCartItems = cartItems.map((item) => ({
    ...item,
    quantity: cart[item._id],
  }));
  const prices = updatedCartItems.map(
    (item) => calculatePrice(item.price, item.discount) * item.quantity
  );
  const sum = sumPrices(prices);
  
  useEffect(() => {
    setDeliveryInfo({
      date: startDate ? startDate.toISOString().split("T")[0] : "",
      time,
      phone : newRecepianPhone !== "" ? newRecepianPhone : user?.phone,
      name: newRecepianName !== "" ? newRecepianName : user?.name, 
      address :selectedAddress !== "" ? selectedAddress : `${newAddress.number} - ${newAddress.street} - ${newAddress.city} / ${newAddress.postalCode}` ,
    });
  }, [startDate, time,newRecepianPhone, newRecepianName, user?.name, selectedAddress,newAddress,user?.phone]);
  
  useEffect(() => {
    setCart(getCart(userEmail));
  }, [userEmail]);

  useEffect(() => {
    setCart(getCart(userEmail));
  }, [quantity]);
 useEffect(()=>{
  if(paied){
    const purchaseData = {
      items: updatedCartItems.map((item) => ({
        productId: item._id, 
        name: item.name,  
        quantity: item.quantity,
        price: calculatePrice(item.price, item.discount) * item.quantity, 
      })),
      deliveryInfo: {
        date: deliveryInfo.date,
        time: deliveryInfo.time,
        phone: deliveryInfo.phone,
        name: deliveryInfo.name,
        address: deliveryInfo.address,
      },
      totalPrice: sum, 
      status: "successful", 
      userEmail: userEmail
    };
    console.log("purchaseData",purchaseData)
    //now you have to store this purchaseData to database - at first create the route then fetch the api route 
  }
 },[paied])

  const clearHandle = () => {
    clear(userEmail);
    console.log("clear the cart");
  };

  function close() {
    setIsOpen(false);
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: value, 
    }));
  };


  return (
    <>
      {Object.keys(cart).length === 0 ? (
        <div className="flex flex-col gap-10">
          <p className="text-xl italic text-center">Cart is empty</p>
          <Link to="/">
            <p className="italic text-center text-blue-600 cursor-pointer">
              Return to the main page.
            </p>
          </Link>
        </div>
      ) : (
        <div className="flex gap-5">
          <div className="w-[80%]">
            {updatedCartItems.map((item, index) => (
              <div className="" key={index}>
                {" "}
                <CartItemCard item={item} />
              </div>
            ))}
          </div>
          <div className="border border-dashed rounded-xl w-[20%] flex flex-col h-[200px]">
            <p className="pl-3 my-3">Quantity : {quantity}</p>
            <p className="pl-3">
              Sum : {sum} <span> € </span>
            </p>
            <button
              className="border rounded-xl w-[150px] mx-auto mt-10 mb-3"
              onClick={() => setIsOpen(true)}
            >
              Pay
            </button>
            <button
              className="border rounded-xl w-[150px] mx-auto mb-3 "
              onClick={clearHandle}
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
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
                Who is the recepian?
              </DialogTitle>
              <form>
                <input
                  type="radio"
                  id="yourselfe"
                  name="recepian"
                  value="yourself"
                  onChange={(event) => setRecepian(event.target.value)}
                  checked={receptian === "yourself"}
                />
                <label htmlFor="yourselfe" className="ml-3">
                  Yourself
                </label>
                <br />
                <input
                  type="radio"
                  id="other"
                  name="recepian"
                  value="other"
                  onChange={(event) => setRecepian(event.target.value)}
                  checked={receptian === "other"}
                />
                <label htmlFor="other" className="ml-3">
                  Other
                </label>
                <br />
              </form>
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={() => {
                    setDeliveryDialog(true);
                    setIsOpen(false);
                  }}
                >
                  continue
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={deliveryDialog}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
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
                Delivery details
              </DialogTitle>
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <p>Date : </p>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
                <div className="flex gap-3">
                  <p>Time : </p>
                  <select
                    className="text-black"
                    name="time"
                    onChange={(event) => setTime(event.target.value)}
                  >
                    <option value="8-11">8-11</option>
                    <option value="13-17">13-17</option>
                    <option value="18-21">18-21</option>
                  </select>
                </div>
                {receptian === "yourself" ? (
                  <div>
                    <p>Phone: {user?.phone}</p>
                    <div
                      className={clsx("flex gap-3", {
                        "flex-col": user?.addresses.length > 1,
                      })}
                    >
                      <p>Address : </p>
                      {user?.addresses.map((address, index) => (
                        <div key={index} className="flex gap-3">
                          <input
                            type="radio"
                            name="address"
                            value={`${address.number} - ${address.street} - ${address.city} / ${address.postalCode}`}
                            onChange={(event) =>
                              setSelectedAddress(event.target.value)
                            }
                          />
                          <span>
                            {" "}
                            {address.number} - {address.street} - {address.city}{" "}
                            / {address.postalCode}{" "}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                      <label>Name :</label>
                      <input
                        type="text"
                        value={newRecepianName}
                        onChange={(event) =>
                          setNewRecepianName(event.target.value)
                        }
                      />
                    </div>
                    <div className="flex gap-3">
                      <label>Phone :</label>
                      <input
                        type="number"
                        value={newRecepianPhone}
                        onChange={(event) =>
                          setNewRecepianPhone(event.target.value)
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <label>Address :</label>
                      <div className="flex flex-col gap-2 pl-10">
                        <div className="flex gap-3">
                          <label>City :</label>
                          <input
                            type="text"
                            name="city"
                            value={newAddress.city}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="flex gap-3">
                          <label>Street :</label>
                          <input
                            type="text"
                            name="street"
                            value={newAddress.street}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="flex gap-3">
                          <label>Number :</label>
                          <input
                            type="number"
                            name="number"
                            value={newAddress.number}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="flex gap-3">
                          <label>Postal Code :</label>
                          <input
                            type="number"
                            name="postalCode"
                            value={newAddress.postalCode}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={()=>{
                    setConfirmDialog(true)
                    setDeliveryDialog(false);
                  }}
                >
                  continue
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={confirmDialog}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
        __demoMode
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
                Plseae Confirm details
              </DialogTitle>
              <div className="flex flex-col gap-3">
                <p>Date of delivery : {deliveryInfo.date}</p>
                <p>Time of delivery: {deliveryInfo.time}</p>
                <p>Recepian: {deliveryInfo.name}</p>
                <p>Phonenumber: {deliveryInfo.phone}</p>
                <p>Address: {deliveryInfo.address}</p>
                <p>Quantity: {quantity}</p>
                <p>Sum: {sum} <span> € </span></p>
              </div>
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={() => {
                    setConfirmDialog(false)
                    setPaied(true)
                    clear(userEmail);
                  }}
                >
                  Confirm
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Cart;
