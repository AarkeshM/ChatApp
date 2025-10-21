import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

const Messages = ({ selectMode, selectedMsgs, setSelectedMsgs }) => {
  useGetRealTimeMessage();
  const { messages } = useSelector((store) => store.message);
  const { authUser } = useSelector((store) => store.user);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!Array.isArray(messages) || messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400 text-base p-4">
        No messages yet. Start the conversation!
      </div>
    );
  }

  return (
    <div
      className="
        flex-1 overflow-y-auto px-2 md:px-5 py-4 flex flex-col
        space-y-2
        bg-transparent
        min-h-0
      "
      style={{ scrollbarGutter: 'stable both-edges' }}
    >
      {messages.map((message) => {
        const isMe = String(authUser?._id) === String(message.senderId);
        const time = new Date(message.createdAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
        const isChecked = selectMode && selectedMsgs.includes(message._id);

        return (
          <div
            key={message._id}
            className={`flex w-full items-center ${isMe ? 'justify-end' : 'justify-start'}`}
          >
            {/* Inline checkbox always visible when in select mode */}
            {selectMode && (
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {
                  if (isChecked) {
                    setSelectedMsgs(selectedMsgs.filter(id => id !== message._id));
                  } else {
                    setSelectedMsgs([...selectedMsgs, message._id]);
                  }
                }}
                className="mr-2 w-5 h-5 accent-blue-500"
              />
            )}
            <div
              className={`
          max-w-[80vw] sm:max-w-[70%] md:max-w-[55%]
          px-3 py-2 rounded-lg shadow text-sm break-words
          ${!isMe
                  ? 'bg-white text-gray-900 rounded-bl-3xl'
                  : 'bg-fuchsia-500/10 text-gray-950 rounded-br-3xl'}
          ${selectMode && isChecked ? 'border-2 border-blue-600' : ''}
        `}
            >
              <span>{message.message}</span>
              <span className="text-[11px] text-gray-600 block text-right mt-1">{time}</span>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};

export default Messages;
