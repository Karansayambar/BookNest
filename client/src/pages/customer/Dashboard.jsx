import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import Carousel from "../../components/Carousel";
// import Product from "../components/Product";
// import Features from "../components/Features";
import livingRoom from "../../assets/bedroom.jpg";
import restaurentImg from "../../assets/restaurentImg.jpg";
import hotel1 from "../../assets/hotel1.jpg";
import hotel2 from "../../assets/hotel2.jpg";
import hotel3 from "../../assets/hotel3.jpg";
import Product from "../../components/Products";
import Selector from "../../components/Selector";

const Dashboard = () => {
  return (
    <div>
      <section className="relative">
        <Carousel />
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Selector />
        </div>
        <div className="px-10 lg:px-40 md:flex items-center justify-between py-4">
          <div>
            <p className="text-[38px] md:text-[42px] lg:text-[72px]">
              Simply Unique/ <br />
              Simply Better.
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold">3legant</span> is a gift &
              decorations store based in HCMC, Vietnam. Est since 2019.{" "}
            </p>
          </div>
        </div>
      </section>
      <section className="lg:flex px-10 lg:px-40 h-auto">
        <img
          src={restaurentImg}
          alt=""
          className="p-2 w-full h-[100%] lg:w-[50%]"
        />
        <div>
          <img src={livingRoom} alt="" className="p-2 w-full h-[50%]" />
          <img src={hotel1} alt="" className="p-2 w-full h-[50%]" />
        </div>
      </section>
      <section className="px-10 lg:px-40 my-10">
        <div className="flex items-end justify-between">
          <p className="text-[20px] md:text-[30px] lg:text-[40px] w-20 md:w-40">
            New Arrivals
          </p>
          <p className="border-b-2 border-black flex items-center gap-1">
            More Products <FaArrowRight />
          </p>
        </div>
        <div className="flex flex-nowrap gap-4 my-4 snap-x">
          <Product />
        </div>
      </section>
      <section className="">{/* <Features /> */}</section>
      <section className="md:flex items-center-justify-evenly">
        <div className="w-[50%]">
          <img src={hotel2} alt="home" />
        </div>
        <div className="flex items-center justify-center">
          <div className="md:px-10 lg:px-20 lg:w-[90%]">
            <p className="text-[#377DFF] font-semibold text-md">
              BOOKING UP TO 35% OFF
            </p>
            <p className="text-[45px] pt-6 leading-[44px]">
              HUNDREDS of New lower prices!
            </p>
            <p className="pt-6 text-[20px] leading-[32px]">
              It’s more affordable than ever to give every room in your home a
              stylish makeover
            </p>

            <p className="border-b-2 border-black flex items-center gap-1 w-24 pt-6">
              Shop Now <FaArrowRight />
            </p>
          </div>
        </div>
      </section>
      <section className="relative flex w-full h-[460px] items-center justify-center">
        <div className="absolute inset-0 w-full h-full text-white">
          <img
            src={hotel3}
            alt="Drawer"
            className="w-full h-full object-cover opacity-[0.8]"
          />
        </div>

        <div className="relative z-10  rounded-lg p-8 max-w-lg text-center text-gray-100">
          <div className="space-y-4">
            <p className="text-[44px]">Join Our Newsletter</p>
            <p>Sign up for deals, new products, and promotions</p>
          </div>
          <div className="mt-6 flex border-b-2 p-2 items-center justify-center space-x-2">
            <input
              type="text"
              placeholder="Email address"
              className="p-2 bg-transparent rounded-md w-64"
            />
            <button className="p-2 rounded-md">Sign Up</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
