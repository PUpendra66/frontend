import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const sendMessage = async () => {
        if (input.trim() === "") return;

        const newMessages = [...messages, { sender: "User", text: input }];
        setMessages(newMessages);

        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/send_message/`,
                { message: input }
            );

            setMessages([...newMessages, { sender: "Bot", text: response.data.bot_reply }]);
        } catch (error) {
            console.error("Error sending message", error);
            alert("Sorry, something went wrong. Please try again later.");
        }

        setInput("");
    };

    return (
        <div className="chat-container">
            <h2>Chatbot</h2>
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <p key={index} className={msg.sender}>
                        <strong>{msg.sender}:</strong> {msg.text}
                    </p>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default App;
