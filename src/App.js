import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import PropertyDetailsForm from './components/PropertyDetailsForm';
import DocumentManagement from './components/DocumentManagement';
import Chatbot from './components/Chatbot'; 
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  const [propertyDetails, setPropertyDetails] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<PropertyDetailsForm onSubmit={setPropertyDetails} />} />
      <Route
        path="/dashboard"
        element={
          <Container className="mt-4">
            <Row>
              <Col md={9}><DocumentManagement /></Col>
              <Col md={3}><Chatbot propertyDetails={propertyDetails} /></Col>
            </Row>
          </Container>
        }
      />
    </Routes>
  );
}

export default App;