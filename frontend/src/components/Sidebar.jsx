import React, { useState, useRef, useEffect, useMemo } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import OtherUsers from './OtherUsers';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';
import Profile from './Profile'; 

const Sidebar = () => {
  const [search, setSearch] = useState('');
  const [showMenu, setShowMenu] = useState(false); // menu state
  const menuRef = useRef();
  const { otherUsers } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const authUser = useSelector((store) => store.user.authUser);

  const filteredUsers = useMemo(() => {
    if (!search.trim()) return otherUsers;
    return otherUsers?.filter((u) =>
      u.fullName.toLowerCase().includes(search.toLowerCase())
    ) || [];
  }, [search, otherUsers]);

  // Handle closing settings dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (!menuRef.current?.contains(e.target)) setShowMenu(false);
    };
    if (showMenu) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showMenu]);

  const logoutHandler = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/v1/user/logout', {
        withCredentials: true,
      });
      dispatch(setAuthUser(null));
      navigate('/login');
      toast.success(res.data.message || 'Logged out successfully');
    } catch (err) {
      console.error(err);
      toast.error('Logout failed');
    }
  };

  const handleReset = () => setSearch('');

  return (
    <div className="h-full w-full flex flex-col bg-stone-200 text-black">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b sticky top-0 bg-zinc-200 z-10">
        <h2 className="font-extrabold text-lg tracking-wide text-blue-700">ChatApp</h2>
        <div className="relative" ref={menuRef}>
          <button
            className="p-2 rounded-lg hover:bg-blue-100/10 transition active:bg-blue-200/10"
            aria-label="Settings"
            onClick={() => setShowMenu((v) => !v)}
          >
            <FiSettings size={22} className="text-blue-700" />
          </button>
          {/* Dropdown menu */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-44 rounded bg-white shadow-xl border z-20">
              <button
                className="w-full text-left px-4 py-2 hover:bg-blue-50 transition"
                onClick={() => setShowProfile(true)}
              >
                My Profile
              </button>
              <Profile
                user={authUser}
                open={showProfile}
                onClose={() => setShowProfile(false)}
                onSave={(updatedForm, photoFile) => {
                  // Call your update API here! Then, optionally:
                  setShowProfile(false);
                }}
              />
              <button
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition"
                onClick={() => {
                  setShowMenu(false);
                  logoutHandler();
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <form
        onSubmit={e => e.preventDefault()}
        className="flex items-center gap-2 p-3 pb-2"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type='text'
          placeholder='Search users…'
          className='flex-1 border rounded px-2 py-1 text-sm text-black'
        />
        {search && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={handleReset}
            className="text-gray-400 hover:text-gray-700 text-xs px-2"
          >&times;</button>
        )}
        <button
          type='submit'
          className='p-1 text-gray-400 hover:text-white'
        >
          <BiSearchAlt2 size={20} />
        </button>
      </form>

      <hr className='my-1 border-gray-700' />

      {/* Other Users */}
      <div className='flex-1 overflow-y-auto px-1 sm:px-0 min-h-0'>
        <OtherUsers users={filteredUsers} />
      </div>
        <button onClick={logoutHandler}>
          Logout
        </button>
      {/* Remove this logout button from footer — now in menu */}
    </div>
  );
};

export default Sidebar;
