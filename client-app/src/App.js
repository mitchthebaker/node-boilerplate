import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_GATEWAY_URI}/messages`).then(result => {
      const data = result.data;
      setMessages(data);
    });
  }, []);

  return (
    <div className="App">
      {messages && messages.map((item, idx) => (
        <div key={idx}>
          { item.message }
        </div>
      ))}
    </div>
  );
};

export default App;
