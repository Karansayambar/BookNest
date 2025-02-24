import React from "react";
import { CiHeart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { hotels } from "../utils/data";
import hotel2 from "../assets/hotel1.jpg";

const Product = () => {
  return (
    <div className="flex items-center flex-wrap justify-start gap-10">
      <div className="w-[300px] h-[360px] border rounded-lg ">
        <img src={hotel2} className="w-full h-[75%] rounded-t-lg" />
        <div className="p-4 pt-4">
          <p className="font-semibold text-lg">Bangalore</p>
          <p>Maharashtra, India</p>
        </div>
      </div>
      <div className="w-[300px] h-[360px] border rounded-lg ">
        <img src={hotel2} className="w-full h-[75%] rounded-t-lg" />
        <div className="p-4 pt-4">
          <p className="font-semibold text-lg">Bangalore</p>
          <p>Maharashtra, India</p>
        </div>
      </div>
      <div className="w-[300px] h-[360px] border rounded-lg ">
        <img src={hotel2} className="w-full h-[75%] rounded-t-lg" />
        <div className="p-4 pt-4">
          <p className="font-semibold text-lg">Bangalore</p>
          <p>Maharashtra, India</p>
        </div>
      </div>
      <div className="w-[300px] h-[360px] border rounded-lg ">
        <img src={hotel2} className="w-full h-[75%] rounded-t-lg" />
        <div className="p-4 pt-4">
          <p className="font-semibold text-lg">Bangalore</p>
          <p>Maharashtra, India</p>
        </div>
      </div>
      <div className="w-[300px] h-[360px] border rounded-lg ">
        <img src={hotel2} className="w-full h-[75%] rounded-t-lg" />
        <div className="p-4 pt-4">
          <p className="font-semibold text-lg">Bangalore</p>
          <p>Maharashtra, India</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
