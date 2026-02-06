import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './style.css';
const socket = io('http://localhost:8080');


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

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      text: question,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Clear input
    const userQuestion = question;
    setQuestion('');

    try {
      // In a real implementation, you would call your backend API here
      // For now, we'll simulate a response from Gemini API
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // This is where you would integrate with the actual Gemini API
      // For demonstration, we'll use simulated responses based on keywords
      let responseText = "";
      
      if (userQuestion.toLowerCase().includes('study') || userQuestion.toLowerCase().includes('learn')) {
        responseText = "I'd be happy to help with your studies! Here are some effective study techniques:\n\n" +
          "1. Pomodoro Technique - Study for 25 minutes, then take a 5-minute break\n" +
          "2. Active recall - Test yourself instead of just re-reading notes\n" +
          "3. Spaced repetition - Review material at increasing intervals\n" +
          "4. Teach someone else - Explaining concepts helps solidify your understanding\n\n" +
          "Would you like specific advice for any particular subject?";
      } else if (userQuestion.toLowerCase().includes('stress') || userQuestion.toLowerCase().includes('anxious')) {
        responseText = "I understand you're feeling stressed, and that's completely normal. Here are some techniques that might help:\n\n" +
          "1. Deep breathing exercises - Try the 4-7-8 technique\n" +
          "2. Progressive muscle relaxation\n" +
          "3. Mindfulness meditation for 5-10 minutes daily\n" +
          "4. Regular physical activity, even a short walk helps\n\n" +
          "Remember, it's okay to ask for help from friends, family, or counselors when you need it.";
      } else if (userQuestion.toLowerCase().includes('sleep')) {
        responseText = "Good sleep is crucial for your mental and physical health. Here are some tips for better sleep:\n\n" +
          "1. Maintain a consistent sleep schedule\n" +
          "2. Avoid screens 1 hour before bedtime\n" +
          "3. Keep your room cool and dark\n" +
          "4. Avoid caffeine late in the day\n" +
          "5. Try relaxation techniques before bed\n\n" +
          "If sleep problems persist, consider speaking with a healthcare provider.";
      } else {
        // Default response
        const responses = [
          "I understand you're reaching out. It takes courage to seek support, and I'm here to help. Could you tell me more about what's on your mind?",
          "Thank you for sharing that with me. It sounds like you're going through a challenging time. What would you like to focus on first?",
          "I'm listening, and I care about your wellbeing. Sometimes talking through our thoughts and feelings can be really helpful. What's your main concern right now?",
          "It's completely normal to feel overwhelmed sometimes. Let's work through this together. What's the most pressing issue for you today?"
        ];
        responseText = responses[Math.floor(Math.random() * responses.length)];
      }
      
      // Add AI response to chat
      const aiMessage = {
        id: Date.now() + 1,
        text: responseText,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      
      // Add error message to chat
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble responding right now. Please try again in a moment.",
        isUser: false,
        timestamp: new Date(),
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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