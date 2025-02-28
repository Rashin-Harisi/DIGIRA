import clsx from "clsx";
import React from "react";

const ProductCardInSellerPage = ({ product }) => {
  return (
    <div className="flex border rounded-xl flex-col lg:flex-row justify-between px-3 py-4">
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
        <p className="p_productCard">
          Submitted Date  : <span className="span_productCard">{product.createdAt.split("T")[0]}</span>
        </p>
        <p className="p_productCard">
          Number of Likes  : <span className="span_productCard">{product.stars.length}</span>
        </p>
        <p className="p_productCard">
          Number of Sell  : <span className="span_productCard"></span>
        </p>
        <p className="p_productCard">
          Status  : <span className="span_productCard">{product.status}</span>
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
            <span className={clsx("span_productCard", "mr-1")}>
              {product.price}
            </span>
            <span className="mr-3">€</span>
            <span className="hidden sm:contents">|</span>
          </p>
          <p className="p_productCard">
            Discount:{" "}
            <span className={clsx("span_productCard", "mr-1")}>
              {product.discount !== 0 ? product.discount : 0}
            </span>
            <span className="mr-3">%</span>
            <span className="hidden sm:contents">|</span>
          </p>
          <p className="p_productCard">
            Quantity:{" "}
            <span className="span_productCard">{product.storage_quantity}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCardInSellerPage;
