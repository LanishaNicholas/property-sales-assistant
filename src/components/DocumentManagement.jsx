import React from 'react';
import { Container, ListGroup, Button, Card } from 'react-bootstrap';
import { FaFilePdf, FaFolderOpen } from 'react-icons/fa';

function DocumentManagement() {
  const documents = [
    { name: 'FloorPlan.pdf', type: 'PDF', size: '1.2 MB', icon: <FaFilePdf color="#d32f2f" /> },
    { name: 'PropertyInspectionReport.pdf', type: 'PDF', size: '850 KB', icon: <FaFilePdf color="#d32f2f" /> },
    { name: 'EnergyCertificate.pdf', type: 'PDF', size: '500 KB', icon: <FaFilePdf color="#d32f2f" /> },
    { name: 'Photos', type: 'Folder', size: '15 MB', icon: <FaFolderOpen color="#1976d2" /> }
  ];

  return (
    <Container className="mt-4">
      <Card style={{ width: '100%', borderRadius: '12px', boxShadow: 'rgb(0 0 0 / 80%) 0px 4px 10px' }}>
        <Card.Header style={{ fontWeight: 'bold', backgroundColor: '#f8f9fa', fontSize: '18px' }}>
          Property Documents
        </Card.Header>
        <Card.Body style={{ padding: '15px' }}>
          <ListGroup variant="flush">
            {documents.map((doc, index) => (
              <ListGroup.Item
                key={index}
                className="d-flex justify-content-between align-items-center"
                style={{ padding: '12px 10px', fontSize: '15px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {doc.icon}
                  <div>
                    <strong>{doc.name}</strong>
                    <div style={{ fontSize: '13px', color: '#777' }}>
                      ({doc.type}, {doc.size})
                    </div>
                  </div>
                </div>
                <Button variant="outline-primary" size="sm" style={{ borderRadius: '20px', padding: '5px 15px' }}>
                  View
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DocumentManagement;