// import React, { useContext, useState } from "react";
// import Contact from "../components/Contact";
import { FaAngleLeft } from "react-icons/fa6";
// import { starRating } from "../functions/rating";
import { BiHeart } from "react-icons/bi";
import Product from "../../components/Products";
// import Product from "../components/Product";
// import { useLocation } from "react-router-dom";
// import { CartCounterContext } from "../features/Context/CartContext";

const ProductDetails = () => {
  return (
    <div>
      <section className="px-10 lg:px-40">
        <div>
          <p className="flex items-center gap-4">
            Home <FaAngleLeft /> Shop <FaAngleLeft /> Living Room{" "}
            <FaAngleLeft /> Product
          </p>
          <div className="w-full flex my-8">
            <div className="w-[50%] flex flex-wrap gap-4">
              <img
                src={data.images[0]}
                alt=""
                className="w-[200px] h-[250px]"
              />
              <img
                src={data.images[1]}
                alt=""
                className="w-[200px] h-[250px]"
              />
              <img
                src={data.images[2]}
                alt=""
                className="w-[200px] h-[250px]"
              />
              <img
                src={data.images[3]}
                alt=""
                className="w-[200px] h-[250px]"
              />
            </div>
            <div className="w-[50%] lg:px-10">
              <div key={data.id}>
                <span className="flex items-center gap-1">
                  {starRating(data.rating)} <p>31 reviews</p>
                </span>
                <p className="text-[40px] font-[500]">{data.title}</p>
                <p>{data.description}</p>
                <span className="flex gap-4">
                  <p>${data.price}</p>
                  <p className="line-through">${data.price}</p>
                </span>
                <div>
                  <p>Measurements</p>
                  <span className="flex items-center gap-2">
                    <p>{data.measurements.width}/</p>
                    <p>{data.measurements.height}/</p>
                    <p>{data.measurements.depth}/</p>
                  </span>
                  <p>Choose Colors</p>
                  <p>Black</p>
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    {/* <div className="flex items-center rounded border pb-1 px-1">
                      <button className="px-1" onClick={() =>handleQuantityChange(1)}>+</button>
                      <p className="px-4">{quantity}</p>
                      <button className="px-1" onClick={() => handleQuantityChange(-1)}>-</button>
                    </div> */}
                    <button className="w-full flex items-center gap-2 border border-black rounded-md px-4 p-1">
                      <BiHeart /> Wishlist
                    </button>
                  </div>
                  <button
                    className="w-full bg-black text-white rounded-md p-2 my-4"
                    onClick={() =>
                      handleAddCart(data.id, { ...data, quantity })
                    }
                  >
                    Add To Cart
                  </button>
                </div>
                <div>
                  <span className="flex items-center justify-between">
                    <p>SKU</p>
                    <p>{data.sku}</p>
                  </span>
                  <span className="flex items-center justify-between">
                    <p>Category</p>
                    <p>{data.category}</p>
                  </span>
                </div>
                <div className="my-8">
                  <p className="text-[22px]">Additional Info</p>
                  <div className="my-2">
                    <p className="font-semibold">Details</p>
                    <p>{data.additional_info.details}</p>
                  </div>
                  <div className="my-2">
                    <p className="font-semibold">Packaging</p>
                    <p>{data.additional_info.packaging}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Product />
        </div>
      </section>
      {/* <Contact /> */}
    </div>
  );
};

export default ProductDetails;
