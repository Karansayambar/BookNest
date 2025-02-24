// src/pages/LoginPage.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { loginUser } from "../utils/api";
import logoImage from "../../assets/hotelLogo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkMsg, setCheckMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setCheckMsg("Both fields are required.");
      return;
    }

    const userData = { email, password };

    try {
      const response = await loginUser(userData);
      localStorage.setItem("token", response.token); // Store the token
      setCheckMsg("Login successful!");
      setTimeout(() => {
        navigate("/dashboard"); // Redirect to dashboard or home page
      }, 2000);
    } catch (error) {
      setCheckMsg(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[600px] items-center justify-center mt-10">
      <img src={logoImage} alt="Sign in illustration" className="w-[500px]" />
      <div className="w-[400px] h-[500px] p-10">
        <div className="w-full flex items-start flex-col">
          <p className="text-3xl pt-10">Sign in</p>
          <p className="py-5">
            Don’t have an account yet?{" "}
            <strong className="text-[#38CB89] font-semibold">
              <Link to="/register">Sign Up</Link>
            </strong>
          </p>
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            <input
              className="p-2 outline-none border-b-2"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="p-2 outline-none border-b-2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-[#141718] text-white p-2 rounded-md"
              type="submit"
            >
              Sign In
            </button>
          </form>
          <p className="py-4">{checkMsg}</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
