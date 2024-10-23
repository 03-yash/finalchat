import React, { useEffect, useRef, useState } from "react";
import { FaSearch, FaRegSmile, FaTimes } from "react-icons/fa"; 
import { useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import {
  addMessage,
  getAlltexts,
} from "../../features/messages/messageService";
import moment from "moment";
import { toast } from "react-toastify"; 

const Conversation = ({ setSendMsg, receiveMsg, onlineUsers }) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { receiver, chatID } = useSelector((state) => state.chat);
  const [msg, setMsg] = useState([]);
  const [textt, setText] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); 
  const [searchResults, setSearchResults] = useState([]); 
  const [isSearchActive, setIsSearchActive] = useState(false); 

  const scroll = useRef();

  const handleEmoji = () => {
    setShowEmoji(!showEmoji);
  };

  const onEmojiClick = (e) => {
    setText((prev) => prev + e.emoji);
  };

  const checkOnlineStatus = () => {
    return onlineUsers.some((onlineUser) => onlineUser.userId === receiver._id);
  };

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const data = await getAlltexts(chatID);
        setMsg(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessage();
  }, [chatID]);

  useEffect(() => {
    if (receiveMsg && receiveMsg.chatId === chatID) {
      setMsg((prevMessages) => [...prevMessages, receiveMsg]);
    }
  }, [receiveMsg, chatID]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  const handleSearch = () => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }
    
    const results = msg.filter(message =>
      message.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (results.length > 0) {
      setSearchResults(results);
      const lastFoundMessage = results[results.length - 1];
      const index = msg.indexOf(lastFoundMessage);
      scrollToMessage(index);
    } else {
      toast.error("No such message found here."); 
    }
  };

  const scrollToMessage = (index) => {
    const messageElements = document.querySelectorAll('.message-container');
    if (messageElements[index]) {
      messageElements[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (textt) {
      const data = {
        chatId: chatID,
        senderId: user._id,
        text: textt,
      };

      const receiverId = receiver._id;
      setSendMsg({ ...data, receiverId });

      try {
        const newMessage = await addMessage(data);
        setMsg((prevMessages) => [...prevMessages, newMessage]);
        setText("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Function to clear the search input
  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <div className="sideChat w-0 flex-1 h-screen bg-[#0a0505] hidden sm:flex flex-col text-white relative">
      {/* Nav */}
      <nav className="flex items-center px-2 text-white justify-between w-full h-[10%] bg-[#353638] absolute top-0">
        <div className="relative">
          <div className="onlineornot img w-12 h-12 border-2 rounded-full border-purple-600">
            <img
              className="w-full h-full object-contain rounded-full"
              src={receiver.image}
              alt=""
            />
          </div>
          {checkOnlineStatus() && (
            <span className="w-3 h-3 bg-green-400 rounded-full absolute bottom-0 right-1"></span>
          )}
        </div>
        <h1>{receiver.name}</h1>
        {/* Search Input */}
        {isSearchActive && (
          <div className="flex items-center px-5 bg-[#353638] border-b border-purple-500">
            <input
              className="bg-transparent w-full text-white  outline-none py-2"
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)} 
              value={searchTerm}
              placeholder="Search messages..."
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <button
              className="text-white ml-2"
              onClick={handleSearch} 
            >
              Search
            </button>
       
            <button
              className="text-white ml-2"
              onClick={clearSearch} 
            >
              <FaTimes />
            </button>
          </div>
        )}
        <button
          className="text-2xl opacity-80 cursor-pointer"
          onClick={() => setIsSearchActive(!isSearchActive)}
        >
          {isSearchActive ? <FaTimes /> : <FaSearch />}
        </button>
      </nav>

      {/* Content */}
      <div className="msgs flex flex-col w-full h-[80%] absolute top-16 bg-[#0F0F0F] overflow-y-auto scrollbar-thin scrollbar-thumb-[#212121] scrollbar-track-black p-2">
        {searchResults.length > 0 ? (
          searchResults.map((message, index) => (
            <div
              ref={scroll}
              key={index}
              className={`message-container w-full mb-4 flex ${
                message.senderId === user._id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-2 border inline-block max-w-[80%] relative rounded-b-2xl bg-purple-900 ${
                  message.senderId !== user._id
                    ? "rounded-tr-2xl"
                    : "rounded-tl-2xl"
                }`}
              >
                {message.text}
                <p
                  className={`text-gray-400 text-xs mt-1 ${
                    message.senderId !== user._id ? "text-left" : "text-right"
                  }`}
                  style={{ marginTop: "5px" }}
                >
                  {moment(message.createdAt).format("h:mm A")}
                </p>
              </div>
            </div>
          ))
        ) : (
          msg.length > 0 ? (
            msg.map((message, index) => (
              <div
                ref={scroll}
                key={index}
                className={`message-container w-full mb-4 flex ${
                  message.senderId === user._id ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-2 border inline-block max-w-[80%] relative rounded-b-2xl bg-purple-900 ${
                    message.senderId !== user._id
                      ? "rounded-tr-2xl"
                      : "rounded-tl-2xl"
                  }`}
                >
                  {message.text}
                  <p
                    className={`text-gray-400 text-xs mt-1 ${
                      message.senderId !== user._id ? "text-left" : "text-right"
                    }`}
                    style={{ marginTop: "5px" }}
                  >
                    {moment(message.createdAt).format("h:mm A")}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No messages here. Start conversation...</p>
          )
        )}
      </div>

      {showEmoji && (
        <EmojiPicker
          autoFocusSearch
          theme="dark"
          className="absolute -bottom-72"
          height={350}
          onEmojiClick={onEmojiClick}
        />
      )}

      {/* Form */}
      <form
        className="flex items-center px-5 text-white justify-between w-full h-[10%] bg-[#353638] absolute bottom-0"
        onSubmit={handleSubmit}
      >
        <div
          onClick={handleEmoji}
          className="p-2 hover:bg-[#2B2B2B] rounded-md"
        >
          <FaRegSmile className="text-2xl cursor-pointer" />
        </div>
        <input
          className="bg-transparent ml-3 w-4/5 border-b border-purple-500 outline-none"
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={textt}
          placeholder="Type your message here..."
        />
        <button className="svg-wrapper">
          <svg
            className="w-6 h-6 rotate-45 text-purple-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path
              fill="currentColor"
              d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
            ></path>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Conversation;
