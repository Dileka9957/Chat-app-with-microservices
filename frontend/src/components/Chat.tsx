import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import type { Message } from "../types/types";

const GET_MESSAGES = gql`
  query {
    messages {
      id
      text
      user
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SendMessage($text: String!, $user: String!) {
    sendMessage(text: $text, user: $user) {
      id
    }
  }
`;

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const { data } = useQuery<{ messages: Message[] }>(GET_MESSAGES);
  const [sendMessage] = useMutation(SEND_MESSAGE);

  useEffect(() => {
    if (data) {
      setMessages(data.messages);
    }
  }, [data]);

  useEffect(() => {
    const ws = new W3CWebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("WebSocket Connected");
    };

    ws.onmessage = (msg) => {
      const newMessage: Message = JSON.parse(msg.data.toString());
      setMessages((prev) => [...prev, newMessage]);
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleSend = () => {
    const user = localStorage.getItem("token") || "anonymous";
    sendMessage({ variables: { text, user } });
    setText("");
  };

  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.id}>
          <strong>{msg.user}:</strong> {msg.text}
        </div>
      ))}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chat;
