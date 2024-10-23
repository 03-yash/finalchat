import React, { useEffect, useState } from "react";
import { FaUserCheck, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { reset, singinUser } from "../../features/user/userSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormdata] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  const { email, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, message } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }

    // Show error message as toast, and reset the error after showing it
    if (isError && message) {
      toast.error(message);
      dispatch(reset()); // Reset the error state after showing the toast
    }
  }, [user, isError, message, navigate, dispatch]);

  const handleChange = (e) => {
    setFormdata((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(singinUser(formData));
    setFormdata({
      email: "",
      password: "",
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState); // Toggle password visibility
  };

  if (isLoading) {
    return (
      <div className="flex bg-[#212121] items-center justify-between w-full py-3 h-screen">
        <div className="flex flex-col items-center py-12 h-screen justify-between w-[550px] bg-transparent mx-auto sm:shadow-xl sm:shadow-gray-900">
          <div className="leap-frog relative flex items-center justify-between w-56 h-40">
            <div className="leap-frog__dot w-10 h-10 rounded-full bg-purple-500"></div>
            <div className="leap-frog__dot w-10 h-10 rounded-full bg-purple-500"></div>
            <div className="leap-frog__dot w-10 h-10 rounded-full bg-purple-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-[#212121] items-center justify-between w-full py-3 h-screen">
      <div className="flex flex-col items-center py-12 h-screen justify-between w-[550px] bg-transparent mx-auto sm:shadow-xl sm:shadow-gray-900">
        <h1 className="text-5xl sm:text-7xl mt-7 text-white font-semibold font-teko">
          Chat App
        </h1>

        <form
          className="flex flex-col w-full sm:w-[70%] h-56 items-center justify-between text-white font-ubuntu"
          onSubmit={handleSubmit}
        >
          <label className="relative cursor-pointer w-full flex justify-center">
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="input"
              className="h-11 w-[80%] text-xl px-3 outline-none border-2 rounded-md border-purple-600 placeholder-purple-600 placeholder-opacity-0 transition duration-200 caret-purple-400 bg-transparent"
            />
            <span className="text-xl text-purple-600 bg-[#212121] px-2 absolute left-[11%] top-2 transition duration-200 input-span">
              Email:
            </span>
          </label>

          <label className="relative cursor-pointer w-full flex justify-center items-center">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="input"
              className="h-11 w-[80%] text-xl px-3 outline-none border-2 rounded-md border-purple-600 placeholder-purple-600 placeholder-opacity-0 transition duration-200 caret-purple-400 bg-transparent"
            />
            <div
              className="absolute text-xl cursor-pointer"
              style={{ right: "12%" }} // Adjust this value to position the icon appropriately
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
            <span className="text-xl text-purple-600 bg-[#212121] px-2 absolute left-[11%] top-2 transition duration-200 input-span1">
              Password:
            </span>
          </label>

          <button className="w-[80%] border-2 rounded-md border-purple-600 h-12 flex justify-around items-center relative text-white text-xl cursor-pointer btn1 transition duration-200">
            <span className="btn-spn btnspn w-1/2 h-2 left-1/4 bg-[#212121] absolute -top-1 transition duration-1000"></span>
            <span className="flex space-x-5 items-center">
              <p>Login</p>
              <FaUserCheck />
            </span>
            <span className="btn-spn1 btnspn w-1/2 h-2 left-1/4 bg-[#212121] absolute -bottom-1 transition duration-1000"></span>
          </button>
        </form>

        <div className="flex text-white space-x-3 items-center">
          <p className="log-sign-text">Don't have an account?</p>
          <Link to={"/signup"}>
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
              <span className="transition duration-300 transform">Register</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
