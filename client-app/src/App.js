import './App.css';

// components 
import { Form, MessagesList } from './components';

const App = () => {
  return (
    <main className="App">
      <Form />
      <h2> Messages List </h2>
      {Array(3).map((e, i) => (
        <>
          {i + 1}
        </>
      ))}
      <MessagesList />
    </main>
  );
};

export default App;
