import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const Message = ({ message }) => {
  const scroll = useRef(null);
  const { authUser, selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  if (!authUser || !selectedUser) {
    return null; // Prevent rendering if data is missing
  }

  const isSender = authUser._id === message?.senderId;
  const senderPhoto = isSender
    ? authUser?.profilePhoto
    : selectedUser?.profilePhoto;
  const senderName = isSender
    ? authUser?.username
    : selectedUser?.username;

  const time = new Date(message?.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div
      ref={scroll}
      className={`flex mb-3 items-end ${
        isSender ? 'justify-end' : 'justify-start'
      } px-2 md:px-4`}
      role="listitem"
    >
      {/* Avatar left (receiver), right (sender) */}
      {!isSender && (
        <img
          className="w-8 md:w-10 rounded-full mr-2 object-cover border border-gray-300"
          src={senderPhoto || '/default-profile.png'}
          alt={senderName + "'s avatar"}
        />
      )}
      <div>
        {/* Name + time */}
        <div className="flex items-center mb-1 text-xs text-gray-500">
          <span>{senderName}</span>
          <time
            className="ml-2 opacity-70"
            title={new Date(message?.createdAt).toLocaleString()}
          >
            {time}
          </time>
        </div>
        {/* Message bubble */}
        <div
          className={`rounded-lg px-4 py-2 max-w-xs md:max-w-sm break-words shadow
            ${isSender ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}
            transition-all duration-200`}
        >
          {message?.message}
        </div>
      </div>
      {isSender && (
        <img
          className="w-8 md:w-10 rounded-full ml-2 object-cover border border-gray-300"
          src={senderPhoto || '/default-profile.png'}
          alt={senderName + "'s avatar"}
        />
      )}
      <div className="flex flex-col flex-1 overflow-y-auto" role="list">
  {messages.map((msg) => (
    <Message message={msg} key={msg._id} />
  ))}
</div>
    </div>
  );
};

export default Message;
