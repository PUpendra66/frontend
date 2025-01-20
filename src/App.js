import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const sendMessage = async () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { sender: "User", text: input }];
    setMessages(newMessages);

    try {
        console.log("Sending message to API:", input);
        console.log("API URL:", process.env.REACT_APP_API_URL);

        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/api/send_message/`,
            { message: input }
        );

        console.log("Received response:", response.data);
        setMessages([...newMessages, { sender: "Bot", text: response.data.bot_reply }]);

    } catch (error) {
        console.error("Error sending message:", error);
        if (error.response) {
            console.error("Server response:", error.response.data);
        }
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


export default App;
