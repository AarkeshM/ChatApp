import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';

const Login = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:8080/api/v1/user/login',
        user,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      dispatch(setAuthUser(res.data));
      toast.success('Login Successfully!', { position: 'top-center' });
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed!', { position: 'top-right' });
      console.error(error);
    }
    setUser({ username: '', password: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center">
      <div className="backdrop-blur-md rounded-xl shadow-xl p-6 md:p-10 w-[450px] max-w-[310px] sm:max-w-[390px] md:max-w-[420px] lg:max-w-[480px]">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-6 text-white">
          Login
        </h1>

        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-white mb-1">
              Username
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-1">
              Password
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Enter password"
            />
          </div>

          <p className="text-center text-sm text-white">
            Don’t have an account?{' '}
            <Link to="/register" className="text-blue-300 hover:underline">
              Signup
            </Link>
          </p>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
