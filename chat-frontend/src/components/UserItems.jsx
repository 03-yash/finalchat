import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createChat, receiverUser } from "../../features/chat/chatSlice";

const UserItems = ({ userData, online }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Start a chat with the selected user
  const startChat = (ID, userData) => {
    const IDS = {
      senderID: user._id,
      receiverID: ID,
    };
    dispatch(receiverUser(userData));
    dispatch(createChat(IDS));
  };

  return (
    <li
      key={userData._id}
      onClick={() => startChat(userData._id, userData)}
      className="flex rounded-lg border-r-0 border-t-0 border-purple-500 items-center p-1 bg-white/10 backdrop-blur-lg mt-3 hover:border-none cursor-pointer"
    >
      <div className="img w-10 h-10 border border-purple-500 rounded-full">
        <img
          className="w-full h-full object-contain rounded-full"
          src={userData.image}
          alt={userData.name}
        />
      </div>
      <span className="ml-2 text-white">
        <p>{userData.name}</p>
        <p
          className={`text-xs ${online ? "text-purple-500" : "text-gray-500"}`}
        >
          {online ? "Online" : "Offline"}
        </p>
      </span>
    </li>
  );
};

export default UserItems;
