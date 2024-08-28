import './App.css';

// components 
import { Form, MessagesList } from './components';

const App = () => {
  return (
    <main className="App">
      <Form />
      {Array(3).fill("").map((e, i) => (
        <div key={`element-${i}`}>
          {i + 1}
        </div>
      ))}
      <h2> Messages List </h2>
      <MessagesList />
    </main>
  );
};

export default App;
