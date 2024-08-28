import './App.css';

// components 
import { Form, MessagesList } from './components';

const App = () => {
  return (
    <main className="App">
      <Form />
      <h3> Messages List </h3>
      <MessagesList />
    </main>
  );
};

export default App;
