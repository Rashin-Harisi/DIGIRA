import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { CiShoppingCart } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import cartStore from "../store/cartStore";
import useUser from "../hooks/useUser";

const AddToCart = ({ product }) => {
  const [addToCart, setAddToCart] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const storage_quantity = product?.storage_quantity;
  const productId = product?._id;
  const addToCart_store = cartStore((state) => state.addToCart);
  const increase_store = cartStore((state) => state.increase);
  const decrease_store = cartStore((state) => state.decrease);
  const deleteFromCart_store = cartStore((state) => state.deleteFromCart);
  const user = useUser()
  const userEmail = user?.email;
  const getCart = cartStore((state) => state.getCartForUser);
  
  useEffect(() => {
    const cart = getCart(userEmail);
    if (cart.length !== 0 && cart[productId]) {
      setQuantity(cart[productId]);
    }
  }, [getCart, productId, userEmail]);

  const add = () => {
    setQuantity(1)
    setAddToCart(true);
    addToCart_store(userEmail, productId);
  };
  const increase = () => {
    setQuantity(quantity + 1);
    increase_store(userEmail, productId);
  };
  const decrease = () => {
    setQuantity(quantity - 1);
    decrease_store(userEmail, productId);
  };
  const remove = () => {
    setAddToCart(false);
    setQuantity(0)
    deleteFromCart_store(userEmail, productId);
  };

  return (
    <>
    {quantity === 0 && !addToCart ? (
        <>
           <button
           onClick={add}
           className={clsx(
             "border absolute bottom-4 w-[200px] h-[50px] rounded-xl flex justify-center items-center gap-4  bg-[#ECF39E] text-[#31572C]",
             { hidden: addToCart }
           )}
         >
           Add to cart{" "}
           <span>
             <CiShoppingCart className="text-xl" />
           </span>
         </button>
         <div
        className={clsx(
          "absolute bottom-4 w-[200px] h-[50px] border rounded-xl flex justify-center items-center text-xl bg-[#ECF39E] text-[#31572C]",
          { hidden: !addToCart }
        )}
      >
        <div
          className={clsx(
            "w-9 h-9 border rounded-xl mx-2 text-center text-[#ECF39E] bg-[#31572C] flex justify-center items-center",
            {}
          )}
        >
          {quantity === 1 ? (
            <button onClick={remove}>
              <AiOutlineDelete />
            </button>
          ) : (
            <button onClick={decrease}> - </button>
          )}
        </div>
        <span className="underline">{quantity}</span>
        <button
          className={clsx(
            "w-9 h-9 border rounded-xl mx-2 text-center text-[#ECF39E] bg-[#31572C]",
            { "cursor-not-allowed opacity-50": quantity === storage_quantity }
          )}
          disabled={quantity === storage_quantity}
          onClick={increase}
        >
          +
        </button>
      </div>
         </>
    ) : (
        <div className="absolute bottom-4 w-[200px] h-[50px] border rounded-xl flex justify-center items-center text-xl bg-[#ECF39E] text-[#31572C]">
        <div
          className={clsx(
            "w-9 h-9 border rounded-xl mx-2 text-center text-[#ECF39E] bg-[#31572C] flex justify-center items-center",
            {}
          )}
        >
          {quantity === 1 ? (
            <button onClick={remove}>
              <AiOutlineDelete />
            </button>
          ) : (
            <button onClick={decrease}> - </button>
          )}
        </div>
        <span className="underline">{quantity}</span>
        <button
          className={clsx(
            "w-9 h-9 border rounded-xl mx-2 text-center text-[#ECF39E] bg-[#31572C]",
            { "cursor-not-allowed opacity-50": quantity === storage_quantity }
          )}
          disabled={quantity === storage_quantity}
          onClick={increase}
        >
          +
        </button>
        </div>
    )}
   
    </>
  );
};

export default AddToCart;
