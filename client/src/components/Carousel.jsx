import React from "react";
import banner2 from "../assets/banner2.jpg";
const Carousel = () => {
  return (
    <div className="md:px-10 lg:px-20">
      <div className="bg-gray-700">
        <img
          src={banner2}
          alt=""
          className="w-screen opacity-[.6] h-[760px]  object-cover"
        />
      </div>
    </div>
  );
};

export default Carousel;
