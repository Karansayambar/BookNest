import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { registerUser } from "../utils/api";
import logoImage from "../../assets/hotelLogo.png";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer"); // Default role
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [checkMsg, setCheckMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !username || !email || !password || !phone || !address) {
      setCheckMsg("All fields are required.");
      return;
    }

    if (!isChecked) {
      setCheckMsg("Please agree to the Privacy Policy and Terms of Use.");
      return;
    }

    const userData = {
      name,
      username,
      email,
      password,
      role,
      contactDetails: { phone, address },
    };

    try {
      // Simulate API response (replace with actual API call)
      // const response = await registerUser(userData);
      const response = { success: true, role: userData.role };

      if (response.success) {
        setCheckMsg("Registration successful!");

        // Store authentication status and role
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("role", userData.role);

        // Redirect based on role
        setTimeout(() => {
          switch (userData.role) {
            case "customer":
              navigate("/customer/dashboard");
              break;
            case "vendor":
              navigate("/vendor/dashboard");
              break;
            case "admin":
              navigate("/admin/dashboard");
              break;
            default:
              navigate("/home");
          }
        }, 2000);
      }
    } catch (error) {
      setCheckMsg(error.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[600px] items-center justify-center mt-10">
      <img src={logoImage} alt="Sign in illustration" className="w-[500px]" />
      <div className="w-[400px] h-[500px] p-10">
        <div className="w-full flex items-start flex-col">
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
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* <input
              className="p-2 outline-none border-b-2"
              type="text"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            /> */}
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
            <select
              className="p-2 outline-none border-b-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
              <option value="admin">Admin</option>
            </select>
            <input
              className="p-2 outline-none border-b-2"
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className="p-2 outline-none border-b-2"
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className="flex items-center justify-between w-full">
              <div>
                <input
                  id="check"
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
                <label htmlFor="check" className="ml-2">
                  I agree with Privacy Policy and Terms of Use
                </label>
              </div>
            </div>
            <button
              className="bg-[#141718] text-white p-2 rounded-md"
              type="submit"
            >
              Sign Up
            </button>
            <p className="py-3 text-center">{checkMsg}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
