import { useEffect, useState } from "react";
import axios from "axios";

export const useMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Send a request to api-gateway, whose URI is specified in .env
    axios.get(`${process.env.REACT_APP_API_GATEWAY_URI}/messages`).then(result => {
      const data = result.data;
      setMessages(data);
    })
    .catch(err => {
      console.error(`Error when getting messages, ${err}`);
    });
  }, []);

  return { messages, setMessages };
}