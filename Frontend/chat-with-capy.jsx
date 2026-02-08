import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './style.css';




function ChatWithCapy() {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Capy, your AI peer support bot. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAnswer = async () => {
    if (!question.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: question,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: question
        })
      });

      const data = await res.json();

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: data.reply,
          isUser: false,
          timestamp: new Date()
        }
      ]);

    } catch (err) {
      console.error(err);
    }

    setIsLoading(false);
    setQuestion("");
  };



  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      generateAnswer();
    }
  };

  const quickMessage = (message) => {
    setQuestion(message);
  };

  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="logo-section">
          <div className="logo">
            <img src="images/logo.png" alt="CapyCares Logo" className="logo-img" />
          </div>
          <h1 className="logo-text">Chat with Capy</h1>
        </div>
        <nav className="nav-links">
          <a href="index.html">Home</a>
          <a href="chat-with-capy.html">Chat with Capy</a>
          <a href="terms-conditions.html">T&C</a>
          <a href="interests.html">Interests</a>
          <button className="dark-mode-toggle" id="darkModeToggle">
            <i className="fas fa-moon"></i>
            <span>Dark</span>
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="chat-container">
        {/* Chat Messages */}
        <div className="chat-messages">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${message.isUser ? 'user' : ''} ${message.isError ? 'error' : ''}`}
            >
              <div className="message-avatar"></div>
              <div className="message-bubble">
                {message.text.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message">
              <div className="message-avatar"></div>
              <div className="message-bubble">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Chat Input */}
        <div className="chat-input-container">
          <div className="chat-input-row">
            <input 
              type="text" 
              className="chat-input" 
              placeholder="Type your message..." 
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button 
              className="btn" 
              style={{ padding: "15px 20px", margin: "0" }}
              onClick={generateAnswer}
              disabled={isLoading || !question.trim()}
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
          
          {/* Quick Actions */}
          <div className="chat-quick-actions">
            <button className="quick-action-btn" onClick={() => quickMessage('Need study tips')}>
              Need study tips
            </button>
            <button className="quick-action-btn" onClick={() => quickMessage('Just want to talk')}>
              Just want to talk
            </button>
          </div>
        </div>
      </main>

      <script src="script.js"></script>
    </>
  );
}

export default ChatWithCapy;