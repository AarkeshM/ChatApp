import React, { useState, useRef, useEffect } from 'react';
import { IoSend } from "react-icons/io5";
import { FaRegSmile } from "react-icons/fa";
import EmojiPicker from 'emoji-picker-react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from '../redux/messageSlice';

const SendInput = () => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const dispatch = useDispatch();
  const { selectedUser } = useSelector(store => store.user);
  const { messages } = useSelector(store => store.message);
  const inputRef = useRef(null);

  // Close picker when clicking outside
  useEffect(() => {
    if (!showEmojiPicker) return;
    const handleClick = (e) => {
      if (!inputRef.current?.contains(e.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showEmojiPicker]);

  const onEmojiClick = (emojiData) => {
    setMessage(prev => prev + emojiData.emoji);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/message/send/${selectedUser?._id}`,
        { message },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      dispatch(setMessages([...(messages || []), res?.data?.newMessage]));
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form 
      onSubmit={onSubmitHandler} 
      className="relative px-2 sm:px-4 py-2 sm:py-3"
      autoComplete="off"
      ref={inputRef}
    >
      <div className="w-full relative flex items-center bg-gray-700 rounded-lg shadow-sm">
        {/* Input */}
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Type a message…"
          className="
            flex-1 text-sm sm:text-base rounded-lg bg-gray-700 text-white 
            px-3 py-2 sm:py-3 pr-20 
            border-none focus:outline-none focus:ring-2 
            placeholder:text-gray-400
          "
        />

        {/* Emoji btn */}
        <button
          type="button"
          tabIndex={0}
          aria-label="Open emoji picker"
          onClick={() => setShowEmojiPicker((v) => !v)}
          className="absolute right-12 sm:right-14 inset-y-0 flex items-center px-1 text-white hover:text-yellow-300 focus:outline-none transition"
        >
          <FaRegSmile size={22} />
        </button>

        {/* Send btn */}
        <button
          type="submit"
          aria-label="Send message"
          className="absolute right-2 inset-y-0 flex items-center px-1 text-emerald-400 hover:text-emerald-600 focus:outline-none transition"
        >
          <IoSend size={24} />
        </button>
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-14 sm:bottom-16 right-2 z-50 drop-shadow-xl">
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            theme="dark"
            width={320}
            emojiStyle="native"
          />
        </div>
      )}

    </form>
  );
};

export default SendInput;
