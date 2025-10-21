import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/message/${selectedUser?._id}`,
          { withCredentials: true }
        );

      
        dispatch(setMessages(res.data || []));
        console.log("Fetched messages:", res.data);

      } catch (error) {
        console.log("Error fetching messages:", error);
      }
    };

    if (selectedUser?._id) {
      fetchMessages();
    }
  }, [selectedUser?._id, dispatch]);
};

export default useGetMessages;
