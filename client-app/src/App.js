import './App.css';

// components 
import { Form, MessagesList } from './components';

const App = () => {
  return (
    <main className="App">
      <Form />
      <p> Messages List </p>
      <MessagesList />
    </main>
  );
};

export default App;
