import React from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { selectedUser } = useSelector((store) => store.user);


  return (
    <div className="fixed inset-0 flex h-full min-h-0 flex-col sm:flex-row">
      {/* Sidebar */}
      <aside
        className={`
          ${selectedUser ? "hidden sm:flex" : "flex"}
          h-full w-full sm:w-[30%] sm:max-w-xs flex-col bg-[#111b21] text-white z-10
        `}
        aria-label="sidebar"
      >
        <Sidebar />
      </aside>

      {/* Chat area */}
      <main
        className={`
          flex-1 h-full bg-[#e5ddd5] 
          ${selectedUser ? "flex flex-col" : "hidden sm:flex"}
        `}
        aria-label="chat area"
      >
        {selectedUser ? (
          <div className="flex-1 flex flex-col h-full min-h-0">
           
            <MessageContainer />
          </div>
        ) : (
          <div className="flex-1 flex flex-col justify-center items-center">
            <h1 className="text-2xl text-gray-600">Select a user to chat</h1>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
