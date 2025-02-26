import clsx from "clsx";
import React, { useState } from "react";
import {Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

const ProductCardInAdminPage = ({ product,seller }) => {
  const [status, setStatus] = useState("");
  let [isOpen, setIsOpen] = useState(true)
  const [note, setNote] = useState("")
  
 

  const submitHandler=async()=> {
    setIsOpen(false)
    const response = await fetch("http://localhost:5000/approveProduct",{
    method: "POST",
    body: JSON.stringify({productId : product._id, status: "declined", note : note}),
      headers: {
          "Content-Type" : "application/json"
      } 
    })
      const data = await response.json();
      if(data.status){
        alert("Product is declined by an Admin.")
      }
  
  }
 
  const approveHandel= async()=>{
    setStatus("approve")
    const response = await fetch("http://localhost:5000/approveProduct",{
    method: "POST",
    body: JSON.stringify({productId : product._id, status: "approved"}),
      headers: {
          "Content-Type" : "application/json"
      } 
    })
      const data = await response.json();
      if(data.status){
        alert("Product is approved by an Admin.")
      }
  }

  const declineHandle= ()=>{
    setStatus("decline")
    setIsOpen(true)
  }
  return (
    <div className="border rounded-xl">
      <div className="border-b px-3">
        <fieldset className="">
          <legend className="pl-4 pt-2 italic">SellerInfo</legend>
          <div className="flex flex-col lg:flex-row justify-around pb-4 leading-loose italic">
            <p>
              Name : <span>{seller && seller[0].name}</span>
            </p>
            <p>
              ÖNACE : <span>{seller && seller[0].business_number}</span>
            </p>
            <p>
              Phone Number : <span>{seller && seller[0].phone}</span>
            </p>
          </div>
        </fieldset>
      </div>
      <div className="flex flex-col lg:flex-row justify-between px-3 py-4">
        <div className="">
          <p className="p_productCard">
            Name : <span className="span_productCard">{product.name[0]}</span>
          </p>
          <p className="p_productCard">
            Company : <span className="span_productCard">{product.company}</span>
          </p>
          <p className="p_productCard">
            Colors : <span className="span_productCard">{product.colors}</span>
          </p>
          <p className="p_productCard">
            Details : <span className="span_productCard">{product.details}</span>
          </p>
        </div>
        <div>
          <div>
            <p className="p_productCard">Images : </p>
            <div className="flex flex-col sm:flex-row gap-3 pl-8">
              {product.images.map((imageUrl, index) => (
                <img key={index} src={imageUrl} alt="image-url" width={70} className="rounded-xl" />
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-3">
            <p className="p_productCard">
              Price: <span className={clsx('span_productCard', 'mr-1')}>{product.price}</span>
              <span className="mr-3">€</span>
              <span className="hidden sm:contents">|</span>
            </p>
            <p className="p_productCard">
              Discount:{" "}
              <span className={clsx('span_productCard', 'mr-1')}>{product.discount !== 0 ? product.discount : 0}</span>
              <span  className="mr-3">%</span>
              <span className="hidden sm:contents">|</span>
            </p>
            <p className="p_productCard">
              Quantity: <span className="span_productCard">{product.storage_quantity}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={approveHandel}
            className={clsx(
              `w-[80px] h-[50px] my-auto border border-[#ECF39E] rounded-md hover:bg-[#90A955] transition duration-300]`,
              { "bg-[#90A955]": status === "approve" }
            )}
          >
            Approve
          </button>
          <button
            type="button"
            onClick={declineHandle}
            className={clsx(
              `w-[80px] h-[50px] my-auto border border-[#fc032c] rounded-md text-[#fc032c] hover:bg-[#fc032c] hover:text-white transition duration-300]`,
              { "bg-[#fc032c] text-white": status === "decline" }
            )}
          >
            Decline
          </button>
        </div>
      </div>
      {status === "decline" && (
        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none " onClose={submitHandler} __demoMode>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
                  <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                      transition
                      className="w-full max-w-md rounded-xl h-[250px] bg-[#ECF39E]  p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                    >
                      <DialogTitle as="h3" className="text-base/7 font-medium text-[#132A13] mb-3">
                        Please Provide a reason for declination.
                      </DialogTitle>
                      <textarea className="focus:border-[#132A13] text-[#132A13] w-full h-[130px] rounded-xl" onChange={(e)=>setNote(e.target.value)}/>
                      <div className="mt-2">
                        <button
                          className="inline-flex items-center gap-2 rounded-md bg-[#132A13] py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                          onClick={submitHandler}
                        >
                          Submit
                        </button>
                      </div>
                    </DialogPanel>
                  </div>
                </div>
              </Dialog>
      )}
    </div>
  );
};

export default ProductCardInAdminPage;
