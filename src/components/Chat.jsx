import { Height } from '@mui/icons-material';
import { Box } from '@mui/material';
import React, { useState ,useEffect} from 'react';


const Chat = () => {
  const [messages, setMessages] = useState([]); // Store chat history
  const [userInput, setUserInput] = useState(''); // Store user input
  const auth=JSON.parse(sessionStorage.getItem("user"));
  useEffect(() => {
    const greetingMessage = { sender: 'bot', text: `Hello ${auth && auth.result.name}! Myself FitnessGuru, How can I assist you today?` };
    setMessages([greetingMessage]);
  }, []);
  // Function to handle sending a message
  const sendMessage = async () => {
    if (!userInput.trim()) return; // Prevent sending empty messages

    const userMessage = { sender: 'user', text: userInput };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setUserInput(''); // Clear input field

    try {
      const response = await fetch('http://localhost:8000/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: userInput }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await response.json();
      console.log(data);
      const botMessage = { sender: 'bot', text: data.result };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { sender: 'bot', text: 'Sorry, something went wrong. Please try again later.' };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return (
    <>
    <Box style={{background:"#000",display:"flex",justifyContent:"center",height:"90vh",overflowY:"auto",paddingTop:"40px"}}>
        
        <div className="chat-container">
        <h1 style={{textAlign:"center",fontFamily:'"Poppins", serif',color:"white"}}>Chat With Us</h1>
      <div className="chat-window">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat-message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
            // style={{ margin: '10px 0', alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start' }}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
    </Box>
    </>
  );
};

export default Chat;

