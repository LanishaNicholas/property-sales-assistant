import React, { useState } from 'react';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { BsRobot } from 'react-icons/bs'; // Bot icon

function Chatbot({ propertyDetails }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input) return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);
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

  return (
    <Card style={{ width: '400px', margin: 'auto', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
      <Card.Header style={{ backgroundColor: '#f8f9fa', fontWeight: 'bold', textAlign: 'center' }}>
        Buyer Assistant Chatbot
      </Card.Header>
      <Card.Body style={{ padding: '15px' }}>
        <div style={{ height: '300px', overflowY: 'auto', padding: '10px', backgroundColor: '#fff', borderRadius: '8px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', marginBottom: '10px' }}>
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

        {/* Input Section */}
        <Form className="mt-3 d-flex">
          <Form.Control
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about the property..."
            style={{ borderRadius: '20px', padding: '10px' }}
          />
          <Button
            variant="success"
            onClick={handleSend}
            className="ms-2"
            style={{ borderRadius: '50%', width: '45px', height: '45px' }}
            disabled={loading}
          >
            {loading ? <Spinner size="sm" animation="border" /> : '✓'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Chatbot;