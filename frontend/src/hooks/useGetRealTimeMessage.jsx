import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
  const dispatch = useDispatch();
  const socket = useSelector((store) => store.socket.socket);
  const messages = useSelector((store) => store.message.messages);
  const messagesRef = useRef(messages);

  // Keep ref synced with latest messages
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      const updatedMessages = [...messagesRef.current, newMessage];
      dispatch(setMessages(updatedMessages));
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, dispatch]);
};

export default useGetRealTimeMessage;
