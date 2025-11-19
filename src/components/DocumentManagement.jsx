import React from 'react';
import { Container, ListGroup, Button, Card } from 'react-bootstrap';

function DocumentManagement() {
  const documents = [
    { name: 'FloorPlan.pdf', type: 'PDF', size: '1.2 MB' },
    { name: 'PropertyInspectionReport.pdf', type: 'PDF', size: '850 KB' },
    { name: 'EnergyCertificate.pdf', type: 'PDF', size: '500 KB' },
    { name: 'Photos', type: 'Folder', size: '15 MB' }
  ];

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header>
          <h4>Property Documents</h4>
        </Card.Header>
        <Card.Body>
          <ListGroup>
            {documents.map((doc, index) => (
              <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{doc.name}</strong> <span className="text-muted">({doc.type}, {doc.size})</span>
                </div>
                <Button variant="outline-primary" size="sm">View</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DocumentManagement;