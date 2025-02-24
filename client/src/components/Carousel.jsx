import React from "react";
import banner2 from "../assets/banner2.jpg";
const Carousel = () => {
  return (
    <div className="px-10 lg:px-40">
      <div className="bg-gray-700">
        <img src={banner2} alt="" className="w-screen opacity-[.6]" />
      </div>
    </div>
  );
};

export default Carousel;
