import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/authActions";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { loginLoading, loginSuccess, loginError } = useSelector(
    (state) => state.auth
  );
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const validateForm = () => {
    let newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    await dispatch(login(email, password));
  };

  if (token) {
    navigate("/expenses");
  }

  useEffect(() => {
    if (loginSuccess) {
      toast.success("Login successful!");
    }
    dispatch({ type: "CLEAR_ERROR" });
  }, [loginSuccess]);

  useEffect(() => {
    if (loginError) {
      toast.error(loginError);
    }
    dispatch({ type: "CLEAR_ERROR" });
  }, [loginError]);

  return (
    <div className="bg-blue_c min-h-screen ">
      <div className="min-h-[35vh] flex justify-center items-center">
        <img src="/login_yellow_icon.png" className="w-2/5  mx-auto" alt="" />
      </div>
      <div className="bg-white min-h-[65vh] rounded-t-3xl shadow-md p-8 max-w-md w-full">
        <h1 className="text-[7vw] font-bold text-center text-light_black mb-6">
          Welcome Back !
        </h1>
        <form onSubmit={HandleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 border rounded-md focus:outline-none transition duration-200 ${
                errors.email ? "border-red-500" : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 border rounded-md focus:outline-none transition duration-200 ${
                errors.password ? "border-red-500" : "border-gray-300 focus:border-blue-500"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {loginError && <p className="text-red-500 text-sm">{loginError}</p>}

          <button
            type="submit"
            disabled={loginLoading}
            className="w-full bg-blue_c text-gray_c py-3 rounded-md hover:bg-gray-400 font-medium transition duration-200"
          >
            {loginLoading ? (
              <div className="flex justify-center items-center">
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4 mr-2 animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
                Loading...
              </div>
            ) : (
              "LOG IN"
            )}
          </button>
          <div className="text-center font-medium mt-4 text-sm text-gray-700">
            Don't have an account?{" "}
            <Link to="/register" className="text-yellow_c hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
