import { useState } from "react";
import axios from 'axios';

const Form = () => {
  const [input, setInput] = useState("");

  const handleChange = (e) => setInput(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_GATEWAY_URI}/messages`, {
      message: input
    }).then(result => {
      // do something with the response sent from server
      if(result) {
        const data = result.data;
        console.log(data);
      }
      
      // without websockets you'll have to refresh the page 
      // to see 'messages' update with the new message
    })
    .catch(err => {
      console.error(`Error when posting a message, ${err}`);
    });
  };

  return (
    <section>
      <label> Send a message </label>
      <input type="text" id="message-input" onChange={e => handleChange(e)} />
      <button id="submission-button" onClick={handleSubmit}> Submit </button>
    </section>
  );
}

export default Form;