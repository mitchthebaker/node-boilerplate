// hooks 
import { useMessages } from '../hooks';

const MessagesList = () => {
  const { messages } = useMessages();

  return (
    <section id="messages-list">
      {messages && messages.map((item, idx) => (
        <div key={idx}>
          { item.message }
        </div>
      ))}
    </section>
  );
};

export default MessagesList;