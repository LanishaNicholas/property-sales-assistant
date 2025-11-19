import React, { useState } from 'react';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { BsRobot } from 'react-icons/bs';
import { FaCommentDots } from 'react-icons/fa'; // Toggle icon

function Chatbot({ propertyDetails }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const prompt = `
You are a helpful property sales assistant. Use these details:
Address: ${propertyDetails?.address || 'Not provided'}
City: ${propertyDetails?.city || 'Not provided'}
Price: ${propertyDetails?.price || 'Not provided'}
Size: ${propertyDetails?.size || 'Not provided'}
Bedrooms: ${propertyDetails?.bedrooms || 'Not provided'}
Bathrooms: ${propertyDetails?.bathrooms || 'Not provided'}
Type: ${propertyDetails?.type || 'Not provided'}
Year Built: ${propertyDetails?.yearBuilt || 'Not provided'}
Neighborhood Notes: ${propertyDetails?.notes || 'Not provided'}
Features: ${propertyDetails?.features || 'Not provided'}

Question: ${input}
Answer in a friendly and concise way.
`;

      const response = await axios.post('http://localhost:5000/chat', { prompt });
      const botReply = response.data?.answer || "Sorry, I couldn't generate a response.";

      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Error connecting to Gemini API.' }]);
    } finally {
      setLoading(false);
    }
  };

  const suggestedReplies = [
    'Does it have parking?',
    'How much are they asking?',
    'When was it built?'
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      <Button
        variant="success"
        onClick={() => setShowChat(!showChat)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          borderRadius: '50%',
          width: '60px',
          height: '60px',
          zIndex: 1000,
          boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease'
        }}
      >
        <FaCommentDots size={24} color="#fff" />
      </Button>

      {/* Chatbot Panel */}
      {showChat && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '350px',
            zIndex: 999,
            animation: 'fadeIn 0.3s ease-in-out'
          }}
        >
          <Card style={{ borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }}>
            <Card.Header style={{ backgroundColor: '#f8f9fa', fontWeight: 'bold', textAlign: 'center' }}>
              Buyer Assistant Chatbot
            </Card.Header>
            <Card.Body style={{ padding: '15px', backgroundColor: '#fff' }}>
              <div
                style={{
                  height: '300px',
                  overflowY: 'auto',
                  padding: '10px',
                  backgroundColor: '#fafafa',
                  borderRadius: '8px',
                  marginBottom: '10px'
                }}
              >
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                      marginBottom: '10px'
                    }}
                  >
                    {msg.sender === 'bot' && <BsRobot style={{ marginRight: '8px', fontSize: '20px', color: '#555' }} />}
                    <div
                      style={{
                        maxWidth: '70%',
                        padding: '10px 14px',
                        borderRadius: '18px',
                        backgroundColor: msg.sender === 'user' ? '#00897B' : '#f1f1f1',
                        color: msg.sender === 'user' ? '#fff' : '#333',
                        fontSize: '14px',
                        lineHeight: '1.4'
                      }}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Suggested Replies */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                {suggestedReplies.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline-success"
                    size="sm"
                    style={{ borderRadius: '20px' }}
                    onClick={() => setInput(reply)}
                  >
                    {reply}
                  </Button>
                ))}
              </div>

              {/* Input Section */}
              <Form
                className="d-flex"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
              >
                <Form.Control
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about the property..."
                  style={{ borderRadius: '20px', padding: '10px' }}
                />
                <Button
                  variant="success"
                  type="submit"
                  className="ms-2"
                  style={{ borderRadius: '50%', width: '45px', height: '45px' }}
                  disabled={loading}
                >
                  {loading ? <Spinner size="sm" animation="border" /> : '✓'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
}

export default Chatbot;
