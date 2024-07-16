// hooks 
import { useMessages } from '../hooks';

export const MessagesList = () => {
  const { messages } = useMessages();

  return (
    <>
      {messages && messages.map((item, idx) => (
        <div key={idx}>
          { item.message }
        </div>
      ))}
    </>
  );
};