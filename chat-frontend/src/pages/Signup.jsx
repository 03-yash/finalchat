import React, { useEffect, useState } from "react";
import { FaUserPlus, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetForm, updateFormData } from "../../features/user/formData";
import { reset, singinUser } from "../../features/user/userSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isError, isLoading, message } = useSelector(
    (state) => state.user
  );

  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    if (isError && message) {
      toast.error(message);
    }
  }, [user, isError, message]);

  const { name, email, password, password2 } = useSelector(
    (state) => state.formData
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else if (password.length < 8) {
      toast.error("Password should be at least 8 characters long");
    } else if (!/\d/.test(password)) {
      toast.error("Password should contain at least one numeric character");
    } else if (!/[a-z]/.test(password)) {
      toast.error(
        "Password should contain at least one lowercase alphabet character"
      );
    } else if (!/[A-Z]/.test(password)) {
      toast.error(
        "Password should contain at least one uppercase alphabet character"
      );
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      toast.error("Password should contain at least one special character");
    } else {
      navigate("/profile/image");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const togglePassword2Visibility = () => {
    setShowPassword2((prev) => !prev);
  };

  if (isLoading) {
    return (
      <div className="flex bg-[#212121] items-center justify-between w-full py-3 h-screen">
        <div className="flex flex-col items-center py-12 h-screen justify-between w-[550px] bg-transparent  mx-auto  sm:shadow-xl sm:shadow-gray-900">
          <div className="leap-frog relative flex items-center justify-between w-56 h-40 ">
            <div className="leap-frog__dot w-10 h-10 rounded-full bg-purple-500"></div>
            <div className="leap-frog__dot w-10 h-10 rounded-full bg-purple-500 "></div>
            <div className="leap-frog__dot w-10 h-10 rounded-full  bg-purple-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-[#212121] items-center justify-between w-full py-1 h-screen">
      <div className="flex flex-col items-center py-8 h-full justify-between w-[550px] bg-transparent  mx-auto  sm:shadow-xl sm:shadow-gray-900">
        <h1 className="text-5xl sm:text-7xl mt-7 text-white font-bold font-teko ">
          Chat App
        </h1>

        <form
          className="flex flex-col w-full sm:w-[70%]  h-96 items-center justify-between text-white font-ubuntu"
          onSubmit={handleSubmit}
        >
          <label className="relative cursor-pointer w-full flex justify-center ">
            <input
              name="name"
              value={name}
              onChange={handleChange}
              type="text"
              placeholder="input"
              required
              className="h-11 w-[80%] text-xl px-3 outline-none border-2 rounded-md border-purple-600 placeholder-purple-600 placeholder-opacity-0 transition duration-200 caret-purple-400 bg-transparent focus:bg-transparent custom-input"
            />
            <span className="text-xl  text-purple-600 bg-[#212121] px-2 absolute left-[11%]  top-2 transition duration-200 input-span">
              Name:
            </span>
          </label>

          <label className="relative cursor-pointer w-full flex justify-center ">
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
              placeholder="input"
              className="h-11 w-[80%] text-xl px-3 outline-none border-2 rounded-md border-purple-600 placeholder-purple-600 placeholder-opacity-0 transition duration-200 caret-purple-400 bg-transparent focus:bg-transparent custom-input"
            />
            <span className="text-xl  text-purple-600 bg-[#212121] px-2 absolute left-[11%]  top-2 transition duration-200 input-span">
              Email:
            </span>
          </label>

          <label className="relative cursor-pointer w-full flex justify-center items-center">
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="input"
              className="h-11 w-[80%] text-xl px-3 outline-none  border-2 rounded-md border-purple-600 placeholder-purple-600 placeholder-opacity-0 transition duration-200 caret-purple-400 bg-transparent focus:bg-transparent custom-input"
            />
            <div
              className="absolute text-xl right-[13%]"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            <span className="text-xl text-purple-600 bg-[#212121] px-2 absolute left-[11%]   top-2 transition duration-200 input-span1">
              Password:
            </span>
          </label>

          <label className="relative cursor-pointer w-full flex justify-center items-center">
            <input
              type={showPassword2 ? "text" : "password"} // Toggle input type
              name="password2"
              value={password2}
              onChange={handleChange}
              placeholder="input"
              className="h-11 w-[80%] text-xl px-3 outline-none  border-2 rounded-md border-purple-600 placeholder-purple-600 placeholder-opacity-0 transition duration-200 caret-purple-400 bg-transparent focus:bg-transparent custom-input"
            />
            <div
              className="absolute text-xl right-[13%]"
              onClick={togglePassword2Visibility}
            >
              {showPassword2 ? <FaEyeSlash /> : <FaEye />}
            </div>
            <span className="text-xl text-purple-600 bg-[#212121] px-2 absolute left-[11%]   top-2 transition duration-200 input-span1">
              Confirm Pass:
            </span>
          </label>

          {/* Disable button while loading */}
          <button
            className={`w-[80%] border-2 rounded-md border-purple-600 h-12 flex justify-around items-center relative text-white text-xl cursor-pointer btn1 transition duration-200 mt-8 ${
              isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
            type="submit"
            disabled={isLoading}
          >
            <span className="flex space-x-5 items-center">
              <p>{isLoading ? "Loading..." : "Next"}</p>
              <FaUserPlus />
            </span>
          </button>
        </form>

        <div className="flex text-white space-x-3 items-center">
          <p>Already have an account?</p>
          <Link to={"/login"}>
            <button className="font-inherit text-lg bg-transparent border border-purple-600 text-white px-4 py-2 pl-5 flex items-center rounded-lg overflow-hidden transition duration-200 cursor-pointer button space-x-2">
              <div className="svg-wrapper">
                <svg
                  className="w-6 h-6 transition duration-300 transform"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="currentColor"
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  ></path>
                </svg>
              </div>
              <span className="transition duration-300 transform">Login</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
