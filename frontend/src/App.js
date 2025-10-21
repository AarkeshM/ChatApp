import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from 'socket.io-client';
import { setSocket } from './redux/socketSlice';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const { authUser } = useSelector(state => state.user);

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:8081", {  // ✅ Fixed port
        query: { userId: authUser._id },
        withCredentials: true
      });

      dispatch(setSocket(socket));

      return () => socket.disconnect();
    }
  }, [authUser, dispatch]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
