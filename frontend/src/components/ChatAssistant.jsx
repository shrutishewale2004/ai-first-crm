import { useState } from "react";
import axios from "axios";

function ChatAssistant() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      type: "assistant",
      text: "Describe an HCP interaction, search previous interactions, edit a record, or request a follow-up suggestion.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message;

    setMessages((current) => [
      ...current,
      {
        type: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const result = await axios.post(
        "http://127.0.0.1:8000/agent/chat",
        {
          message: userMessage,
        }
      );

      setMessages((current) => [
        ...current,
        {
          type: "assistant",
          text: result.data.response,
        },
      ]);
    } catch (error) {
      const errorMessage =
        error.response?.status === 429
          ? "Groq rate limit reached. Please try again later."
          : "Unable to contact the AI assistant.";

      setMessages((current) => [
        ...current,
        {
          type: "assistant",
          text: errorMessage,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="card chat-card">
      <div className="card-heading">
        <div>
          <span className="section-label">AI Assistant</span>
          <h2>CRM Copilot</h2>
        </div>

        <span className="online-badge">Online</span>
      </div>

      <div className="chat-messages">
        {messages.map((item, index) => (
          <div key={index} className={`message ${item.type}`}>
            {item.text}
          </div>
        ))}

        {loading && (
          <div className="message assistant">AI is thinking...</div>
        )}
      </div>

      <div className="chat-input">
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Describe interaction..."
        />

        <button
          type="button"
          onClick={sendMessage}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </aside>
  );
}

export default ChatAssistant;