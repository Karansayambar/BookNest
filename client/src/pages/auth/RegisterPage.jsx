import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import logoImage from "../../assets/hotelLogo.png";
import { registerUser } from "../../store/slices/authSlice";

const RegisterPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "customer",
  });
  const [checkMsg, setCheckMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !userData.name ||
      !userData.email ||
      !userData.password ||
      !userData.phone ||
      !userData.address
    ) {
      setCheckMsg("All fields are required.");
      return;
    }

    setLoading(true);
    dispatch(registerUser(userData, navigate, setCheckMsg)).finally(() =>
      setLoading(false)
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-full items-center justify-center mt-6 gap-6">
      <img src={logoImage} alt="Sign in illustration" className="w-[500px]" />
      <div className="w-[400px] lg:w-[500px] h-[600px] p-10 border rounded-lg">
        <div className="w-full flex flex-col">
          <p className="text-3xl">Sign Up</p>
          <p className="py-5">
            Already have an account?{" "}
            <strong className="text-[#38CB89]">
              <Link to="/login">Sign In</Link>
            </strong>
          </p>
          <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
            <input
              className="p-2 outline-none border-b-2"
              type="text"
              name="name"
              placeholder="Your name"
              value={userData.name}
              onChange={handleChange}
            />
            <input
              className="p-2 outline-none border-b-2"
              type="email"
              name="email"
              placeholder="Email address"
              value={userData.email}
              onChange={handleChange}
            />
            <input
              className="p-2 outline-none border-b-2"
              type="password"
              name="password"
              placeholder="Password"
              value={userData.password}
              onChange={handleChange}
            />
            <select
              className="p-2 outline-none border-b-2"
              name="role"
              value={userData.role}
              onChange={handleChange}
            >
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
              <option value="admin">Admin</option>
            </select>
            <input
              className="p-2 outline-none border-b-2"
              type="text"
              name="phone"
              placeholder="Phone"
              value={userData.phone}
              onChange={handleChange}
            />
            <input
              className="p-2 outline-none border-b-2"
              type="text"
              name="address"
              placeholder="Address"
              value={userData.address}
              onChange={handleChange}
            />
            <button
              className="bg-[#141718] text-white p-2 rounded-md"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
            <p className="py-3 text-center">{checkMsg}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
