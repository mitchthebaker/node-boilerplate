import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [message, setMessage] = useState("");
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

  const handleChange = (e) => setMessage(e.target.value);

  const handleSubmit = () => {
    axios.post(`${process.env.REACT_APP_API_GATEWAY_URI}/messages`, {
      message: message
    }).then(result => {
      // do something with the response sent from server
      const data = result.data;
      console.log(data);
      
      // without websockets you'll have to refresh the page 
      // to see 'messages' update with the new message
    })
    .catch(err => {
      console.error(`Error when posting a message, ${err}`);
    });
  };

  return (
    <div className="App">
      <div>
        <label> Send a message </label>
        <input type="text" onChange={e => handleChange(e)} />
        <button onClick={handleSubmit}> Submit </button>
      </div>
      {messages && messages.map((item, idx) => (
        <div key={idx}>
          { item.message }
        </div>
      ))}
    </div>
  );
};

export default App;
