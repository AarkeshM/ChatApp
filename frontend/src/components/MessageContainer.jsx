import React, { useState, useRef, useEffect } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from '../redux/userSlice';
import useGetMessages from '../hooks/useGetMessages';
import Messages from './Messages';
import SendInput from './SendInput';
import axios from "axios";
import toast from "react-hot-toast";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const { selectedUser, authUser } = useSelector((store) => store.user);

  useGetMessages();

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  const [selectMode, setSelectMode] = useState(false);
  const [selectedMsgs, setSelectedMsgs] = useState([]);

  // Close menu when clicking outside it
  useEffect(() => {
    const handleClick = (e) => {
      if (!menuRef.current?.contains(e.target)) setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  // API handlers
  const handleClearChat = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/message/clear-all/${selectedUser._id}`,
        { withCredentials: true }
      );
      toast.success("Chat cleared");
      setSelectedMsgs([]);
      setSelectMode(false);
      // Optionally refetch messages here!
    } catch (e) {
      toast.error("Failed to clear chat");
    }
  };

  const handleDeleteSelected = async () => {
    if (!selectMode || selectedMsgs.length === 0) return;
    try {
      await axios.post(
        `http://localhost:8080/api/v1/message/delete-bulk`,
        { messageIds: selectedMsgs },
        { withCredentials: true }
      );
      toast.success("Selected messages deleted");
      setSelectedMsgs([]);
      setSelectMode(false);
      // Optionally refetch messages here!
    } catch (e) {
      toast.error("Failed to delete selected messages");
    }
  };

  // Cancel select mode
  const handleCancelSelect = () => {
    setSelectMode(false);
    setSelectedMsgs([]);
  };

  if (!selectedUser) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-700">
          Hi {authUser?.fullName || "User"} 👋
        </h1>
        <p className="text-gray-500">Select a user to start chatting.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full min-h-0">
      {/* HEADER */}
      <header className="flex items-center gap-2 bg-[#202c33] text-white px-4 py-3 shadow z-10 relative">
        {/* Back arrow (mobile only) */}
        <button
          onClick={() => dispatch(setSelectedUser(null))}
          className="sm:hidden text-2xl mr-2"
          aria-label="Go back"
        >
          ←
        </button>
        {/* Avatar */}
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
          <img
            src={selectedUser.profilePhoto || "/default-profile.png"}
            alt={selectedUser.fullName + " avatar"}
            className="object-cover w-full h-full"
          />
        </div>
        {/* Username */}
        <span
          className="ml-2 font-semibold truncate max-w-[10rem] md:max-w-xs"
          title={selectedUser.fullName}
        >
          {selectedUser.fullName}
        </span>
        <div className="flex-1" />
        {/* 3 Dots Dropdown Menu */}
        <div className="relative" ref={menuRef}>
          <button
            className="p-2 hover:bg-[#29353b] rounded-full"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="More options"
          >
            <HiOutlineDotsVertical className="text-xl" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 z-30 mt-1 w-44 rounded bg-white shadow-xl text-gray-900 overflow-hidden top-full">
              {/* SELECT */}
              <button
                className="w-full text-left px-4 py-3 sm:py-2 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus-visible:bg-gray-200 transition text-gray-900 text-base sm:text-sm"
                onClick={() => {
                  setMenuOpen(false);
                  setTimeout(() => {
                    setSelectMode(true);
                    setSelectedMsgs([]);
                  }, 10);
                }}
              >
                Select
              </button>
              {/* CLEAR CHAT */}
              <button
                className="w-full text-left px-4 py-3 sm:py-2 hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus-visible:bg-gray-200 transition text-gray-900 text-base sm:text-sm"
                onClick={() => {
                  setMenuOpen(false);
                  handleClearChat();
                }}
              >
                Clear chat
              </button>
              {/* DELETE */}
              <button
                disabled={!selectMode || selectedMsgs.length === 0}
                className={`w-full text-left px-4 py-3 sm:py-2 hover:bg-red-100 active:bg-red-200 focus:outline-none focus-visible:bg-red-200 transition text-red-700 text-base sm:text-sm ${
                  (!selectMode || selectedMsgs.length === 0)
                    ? "opacity-60 cursor-not-allowed"
                    : ""
                }`}
                onClick={() => {
                  setMenuOpen(false);
                  handleDeleteSelected();
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>
        {/* Cancel button in select mode */}
        {selectMode && (
          <button
            className="ml-2 px-2 py-1 rounded bg-transparent text-white border border-white hover:bg-white hover:text-[#202c33] transition"
            onClick={handleCancelSelect}
          >
            Cancel
          </button>
        )}
      </header>
      {/* CHAT BODY & INPUT */}
      <main className="flex-1 flex flex-col h-full bg-[#e5ddd5] min-h-0">
        <section className="flex-1 overflow-y-auto px-1 py-2 md:px-3 md:py-4" tabIndex={0}>
          <Messages
            selectMode={selectMode}
            selectedMsgs={selectedMsgs}
            setSelectedMsgs={setSelectedMsgs}
          />
        </section>
        {/* Hide SendInput in select mode (if you prefer not to send during selection) */}
        {!selectMode && (
          <div className="bg-[#e5ddd5] border-t border-gray-300 px-2 py-2 md:px-4 sticky bottom-0 z-10">
            <SendInput />
          </div>
        )}
      </main>
    </div>
  );
};

export default MessageContainer;
