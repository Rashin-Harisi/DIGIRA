import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import clsx from "clsx";
import React, { useState } from "react";

const SellerCard = ({ seller, products }) => {
  const [status, setStatus] = useState("");
  let [isOpen, setIsOpen] = useState(true);
  const {
    name,
    email,
    isVerified,
    phone,
    address,
    business_number,
    createdAt,
  } = seller;
  const seller_products = products?.filter(
    (product) => product.sellerId === seller._id
  );
 
  
  const close = () => {
    setIsOpen(false);
  };
  return (
    <div className="border flex flex-col sm:flex-row rounded-xl px-3 py-5">
      <div className="sm:w-[50%]">
        <p className="p_productCard">
          Name : <span>{name}</span>
        </p>
        <p className="p_productCard">
          Email : <span>{email}</span>
        </p>
        <p className="p_productCard">
          Phone Number : <span>{phone}</span>
        </p>
        <p className="p_productCard">
          ÖNACE : <span>{business_number}</span>
        </p>
      </div>
      <div>
        <p className="p_productCard">
          Address : <span>{address}</span>
        </p>
        <p
          className={clsx("text-red-500 italic leading-loose font-semibold", {
            "text-green-400": isVerified,
          })}
        >
          Verified
        </p>
        <p className="p_productCard">
          Join Date : <span>{createdAt.split("T")[0]}</span>
        </p>
        <div className="flex gap-10 mt-3 leading-relaxed">
          <button
            className="border rounded-xl w-[100px]  hover:bg-[#90A955] transition duration-300"
            onClick={() => {
              setStatus("products");
              setIsOpen(true);
            }}
          >
            Products
          </button>
          <button
            className="border rounded-xl w-[100px]  hover:bg-[#90A955] transition duration-300"
            onClick={() => {
              setStatus("payments");
              setIsOpen(true);
            }}
          >
            Payments
          </button>
        </div>
      </div>
      {status === "products" && (
        <Dialog
          open={isOpen}
          as="div"
          className="relative z-10 focus:outline-none "
          onClose={close}
          __demoMode
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="w-full max-w-5xl rounded-xl min-h-[200px] bg-[#ECF39E]  p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <DialogTitle
                  as="h3"
                  className="text-base/7 font-medium text-[#132A13] mb-3 flex justify-between"
                >
                  Products List
                  <button onClick={close} className="border border-[red] rounded-xl w-[30px] bg-[red] text-white"> X </button>
                </DialogTitle>
                <div className="">
                  {seller_products.length !== 0 && (
                    <div className="text-[#132A13]">
                      {seller_products.map((product,index) => (
                        <div key={index} className="border border-[#132A13] rounded-xl my-5">
                        <div className="flex flex-col lg:flex-row justify-between px-3 py-4 ">
                          <div className="">
                            <p className="p_productCard">
                              Name :{" "}
                              <span className="span_productCard">
                                {product.name[0]}
                              </span>
                            </p>
                            <p className="p_productCard">
                              Company :{" "}
                              <span className="span_productCard">
                                {product.company}
                              </span>
                            </p>
                            <p className="p_productCard">
                              Colors :{" "}
                              <span className="span_productCard">
                                {product.colors}
                              </span>
                            </p>
                            <p className="p_productCard">
                              Details :{" "}
                              <span className="span_productCard">
                                {product.details}
                              </span>
                            </p>
                          </div>
                          <div>
                            <div>
                              <p className="p_productCard">Images : </p>
                              <div className="flex flex-col sm:flex-row gap-3 pl-8">
                                {product.images.map((imageUrl, index) => (
                                  <img
                                    key={index}
                                    src={imageUrl}
                                    alt="image-url"
                                    width={70}
                                    className="rounded-xl"
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3 mt-3">
                              <p className="p_productCard">
                                Price:{" "}
                                <span
                                  className={clsx("span_productCard", "mr-1")}
                                >
                                  {product.price}
                                </span>
                                <span className="mr-3">€</span>
                                <span className="hidden sm:contents">|</span>
                              </p>
                              <p className="p_productCard">
                                Discount:{" "}
                                <span
                                  className={clsx("span_productCard", "mr-1")}
                                >
                                  {product.discount !== 0
                                    ? product.discount
                                    : 0}
                                </span>
                                <span className="mr-3">%</span>
                                <span className="hidden sm:contents">|</span>
                              </p>
                              <p className="p_productCard">
                                Quantity:{" "}
                                <span className="span_productCard">
                                  {product.storage_quantity}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
      {status === "payments" && (
        <Dialog
          open={isOpen}
          as="div"
          className="relative z-10 focus:outline-none "
          onClose={close}
          __demoMode
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="w-full max-w-5xl rounded-xl min-h-[200px] bg-[#ECF39E]  p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
              >
                <DialogTitle
                  as="h3"
                  className="text-base/7 font-medium text-[#132A13] mb-3"
                >
                  Payments
                </DialogTitle>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default SellerCard;
