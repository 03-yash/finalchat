import { toast } from "react-toastify";
import { io } from "socket.io-client";
import React, { useEffect, useRef, useState } from "react";
import { FaUserMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signoutUser } from "../../features/user/userSlice";
import Listusers from "../components/Listusers";
import Conversation from "../components/Converstation";

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, users, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.user
  );
  const { chat, receiver } = useSelector((state) => state.chat);

  // Socket related state
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMsg, setSendMsg] = useState(null);
  const [receiveMsg, setReceiveMsg] = useState(null);

  const socket = useRef();

  // Initialize socket connection
  useEffect(() => {
    if (user && user._id) {
      socket.current = io("https://finalchat-backend.vercel.app/");

      // Add user to the socket room
      socket.current.emit("new-user-add", user._id);

      // Get the list of online users
      socket.current.on("get-users", (users) => {
        setOnlineUsers(users);
      });

      // Clean up the socket connection when component unmounts
      return () => {
        socket.current.off("get-users");
        socket.current.disconnect();
      };
    }
  }, [user]);

  // Sending messages through socket
  useEffect(() => {
    if (sendMsg !== null) {
      socket.current.emit("send-message", sendMsg);
    }
  }, [sendMsg]);

  // Receiving messages from socket
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceiveMsg(data);
    });

    // Clean up the message listener
    return () => {
      socket.current.off("receive-message");
    };
  }, []);

  // Navigate to login if the user is not authenticated
  useEffect(() => {
    console.log("Loading:", isLoading);
    console.log("User:", user);
    console.log("Is Error:", isError);
    console.log("Message:", message);

    if (!isLoading && (!user || Object.keys(user).length === 0)) {
      navigate("/login");
    }

    if (isError && message) {
      toast.error(message);
    }
  }, [user, isLoading, isError, message, navigate]);

  // Logout handler
  const handleLogout = async () => {
    dispatch(signoutUser());
    navigate("/login");
  };

  // Check if a specific user is online
  const checkOnlineStatus = (userData) => {
    return onlineUsers.some((onlineUser) => onlineUser.userId === userData._id);
  };

  // Loading state for user data
  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-[#212121]">
        <div className="leap-frog relative flex items-center justify-between w-72 h-40">
          <div className="leap-frog__dot w-10 h-10 rounded-full bg-purple-500"></div>
          <div className="leap-frog__dot w-10 h-10 rounded-full bg-purple-500"></div>
          <div className="leap-frog__dot w-10 h-10 rounded-full bg-purple-500"></div>
        </div>
      </div>
    );
  }

  // Render the chat app if user exists
  if (user && Object.keys(user).length > 0) {
    return (
      <div className="main bg-[#212121] w-full h-screen flex">
        <div className="sideUsers w-full sm:w-1/3 md:w-1/3 lg:w-1/3 xl:w-1/4 h-screen bg-[#353638]">
          <div className="px-2 pt-2 flex flex-col h-screen">
            <nav className="flex items-center px-2 text-white justify-between">
              <div className="img w-12 h-12 border-2 rounded-full border-purple-600">
                <img
                  className="w-full h-full object-contain rounded-full"
                  src={user.image}
                  alt=""
                />
              </div>
              <span className="text-center space-y-1">
                <h1 className="text-md">Chat App</h1>
                <h1 className="text-xs text-purple-500 ">{user.name}</h1>
              </span>
              <button
                className="text-2xl opacity-70 hover:scale-90 hover:opacity-100"
                onClick={handleLogout}
              >
                <FaUserMinus />
              </button>
            </nav>
            <Listusers users={users} checkOnlineStatus={checkOnlineStatus} />
          </div>
        </div>
        {receiver ? (
          <Conversation
            setSendMsg={setSendMsg}
            receiveMsg={receiveMsg}
            onlineUsers={onlineUsers}
            users={users}
          />
        ) : (
          <></>
        )}
      </div>
    );
  }

  // Show nothing if user is being loaded
  return null;
};

export default Chat;
