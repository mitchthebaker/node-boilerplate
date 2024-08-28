import './App.css';

// components 
import { Form, MessagesList } from './components';

const App = () => {
  return (
    <main className="App">
      <Form />
      <h2> Messages List </h2>
      <MessagesList />
    </main>
  );
};

export default App;
