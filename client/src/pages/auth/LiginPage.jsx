import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logoImage from "../../assets/hotelLogo.png";
import { loginUser } from "../../store/slices/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, role } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(({ role }) => {
        if (role === "vendor") {
          navigate("/vendor-dashboard");
        } else {
          navigate("/dashboard");
        }
      })
      .catch(() => {});
  };

  return (
    <div className="flex flex-col md:flex-row h-[600px] items-center justify-center">
      <img src={logoImage} alt="Sign in illustration" className="w-[500px]" />
      <div className="w-[500px] p-10 rounded-lg">
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
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          {error && <p className="py-4 text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
