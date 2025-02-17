import React, { useState } from "react";

const SubmitProduct = ({user}) => {
  const [images, setImages] = useState([null, null, null, null]);
  
  const handleImage = (index, file) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = file;
      return updatedImages;
    });
  };
  const removeImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = null;  
      return updatedImages;
    });
  };

  const productSubmit = async (e) => {
    e.preventDefault();
    const form_info = e.target;
    const form_data = new FormData();

    if (!images.some((image) => image)) {
      alert("At least one image is required.");
      return;
    }
    images.forEach((image, index) => {
      if (image) {
        form_data.append(`images[]`, image);
      }
    });
    const colors = form_info.color.value.split(",");
    form_data.append("name", form_info.name.value);
    form_data.append("name", form_info.name.value);
    form_data.append("company", form_info.company.value);
    form_data.append("colors", colors);
    form_data.append("details", form_info.details.value || "");
    form_data.append("price", form_info.price.value);
    form_data.append("discount", form_info.discount.value || "");
    form_data.append("quantity", form_info.quantity.value);
    form_data.append("sellerId", user._id.$iod || "");

    const response = await fetch("http://localhost:5000/submitProduct", {
      method: "POST",
      body: form_data,
    });
    const data = await response.json();
    if(data.status){
      alert('Your product is submitted. Please wait until admins approve it.')
    }
  };

  return (
    <div className="w-[85%] mx-auto">
      <fieldset className="border border-[#ECF39E]">
        <legend className="px-2">SUBMIT A PRODUCT TO SELL</legend>
        <div className="border-b border-[#ECF39E] h-16 py-[12px]">
          <p className="text-center">
            Seller info - Name: {user?.name} , and ID: {user?._id.$iod}
          </p>
        </div>
        <form className="flex flex-col" onSubmit={productSubmit}>
          <label htmlFor="name" className="label_submitProduct">
            Name od Product :{" "}
          </label>
          <input id="name" type="text" className="input_submitProduct" />
          <p className="p_submitProduct">
            Please make a clear name includes: model, version, brand, and other
            details that customers need to know
          </p>
          <label htmlFor="company" className="label_submitProduct">
            Brand :{" "}
          </label>
          <input id="company" type="text" className="input_submitProduct" />
          <label htmlFor="color" className="label_submitProduct">
            Colors :{" "}
          </label>
          <input id="color" type="text" className="input_submitProduct" />
          <p className="p_submitProduct">
            Please separate colors (if there is more that one) by "," .{" "}
          </p>
          <label htmlFor="details" className="label_submitProduct">
            Details :{" "}
          </label>
          <textarea id="details" className="input_submitProduct text-black" />
          <p className="p_submitProduct">
            please provide all information about your product for example if it
            is a cloth provide data about its texture, available sizes , ...
          </p>
          <label htmlFor="price" className="label_submitProduct">
            Price :{" "}
          </label>
          <div className="input_submitProduct">
            <input id="price" type="number" className="w-[50%] mr-[20px]" />
            <span className="text-lg">€</span>
          </div>
          <label htmlFor="discount" className="label_submitProduct">
            Discount :{" "}
          </label>
          <div className="input_submitProduct">
            <input id="discount" type="number" className="w-[50%] mr-[20px]" />
            <span className="text-lg">%</span>
          </div>
          <p className="p_submitProduct">
            0-100 , It is recommended to set a discount to make it more
            attractive.
          </p>
          <label htmlFor="images" className="label_submitProduct">
            Images :{" "}
          </label>
          <div id="images" className="flex flex-col">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="input_submitProduct mb-[10px] flex">
                <input
                  type="file"
                  id={`image${index + 1}`}
                  accept="image/*"
                  onChange={(e) => handleImage(index, e.target.files[0])}
                  className="mb-[10px]"
                />
                {images[index] && (
                  <div className="flex gap-4">
                  <img
                    src={URL.createObjectURL(images[index])}
                    alt={`Preview ${index + 1}`}
                    className="w-24 h-24 object-cover mt-2"
                  />
                  <button type="button" onClick={() => removeImage(index)}>X</button>
                </div>
                )}
              </div>
            ))}
          </div>
          <p className="p_submitProduct">At least one image is required.</p>
          <label htmlFor="quantity" className="label_submitProduct">
            Quantity :{" "}
          </label>
          <input id="quantity" type="number" className="input_submitProduct" />
          <p className="p_submitProduct">
            The quantity of the product is available to sell in this platform.
          </p>
          <div className="flex justify-center">
            <button
              type="submit"
              className="my-[20px] border rounded-full w-[150px] h-[50px] text-[#132A13] bg-[#ECF39E]"
            >
              Submit
            </button>
          </div>
        </form>
      </fieldset>
    </div>
  );
};

export default SubmitProduct;
