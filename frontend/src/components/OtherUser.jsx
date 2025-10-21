import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((store) => store.user);

  const isOnline = onlineUsers?.includes(user._id);
  const isSelected = selectedUser?._id === user?._id;

  const handleSelectUser = () => {
    dispatch(setSelectedUser(user));
  };

  return (
    <div
      tabIndex={0}
      role="option"
      aria-selected={isSelected}
      onClick={handleSelectUser}
      onKeyUp={e => {
        if (e.key === 'Enter' || e.key === ' ') handleSelectUser();
      }}
      className={`
        group flex items-center mt-1/2 gap-3 px-3 py-2 rounded-lg cursor-pointer
        transition-all duration-100
        ${isSelected
          ? 'bg-[#2a3942] font-semibold text-zinc-200'
          : 'hover:bg-[#bbbbbb] active:bg-[#ffffff] font-semibold text-gray-800'
        }
        outline-none focus:ring-2 focus:ring-blue-400
      `}
      style={{ minHeight: '56px' /* ensures nice click surface on mobile */ }}
    >
      {/* Avatar with online status */}
      <div className="relative w-10 h-10 flex-shrink-0">
        <img
          src={user?.profilePhoto || '/default-profile.png'}
          alt={user?.fullName}
          className="rounded-full w-full h-full object-cover border border-gray-600"
        />
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#2a3942] rounded-full" />
        )}
      </div>
      {/* Name, truncated for long names */}
      <div className="flex-1 min-w-0">
        <p className="text-sm md:text-base truncate">{user?.fullName}</p>
      </div>
      {/* (Optional: Add last message/time/unread count here later) */}
    </div>
  );
};

export default OtherUser;
