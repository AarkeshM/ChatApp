import React from 'react';
import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import { useSelector } from 'react-redux';

const OtherUsers = ({ users }) => {
  useGetOtherUsers();
  // Use the users prop if provided (e.g., filtered by Sidebar search), else take from store.
  const storeUsers = useSelector(store => store.user.otherUsers);
  const userList = users ?? storeUsers;

  if (!userList) {
    return (
      <div className="p-6 text-center text-gray-400 text-base">
        Loading users…
      </div>
    );
  }

  if (userList.length === 0) {
    return (
      <div className="p-6 text-center text-gray-400 text-base">
        No other users found.
      </div>
    );
  }

  return (
    <div
      className="
        h-full
        overflow-y-auto
        scrollbar-thin
        scrollbar-thumb-gray-400
        scrollbar-track-transparent
        px-1 sm:px-2
        py-2
        space-y-1
      "
      role="list"
      tabIndex={0}
    >
      {userList.map(user => (
        <OtherUser key={user._id} user={user} />
      ))}
    </div>
  );
};

export default OtherUsers;
