import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

function PropertyDetailsForm() {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    size: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    type: '',
    yearBuilt: '',
    notes: '',
    features: ''
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.address || !formData.city || !formData.price) {
      setError('Please fill in all required fields: Address, City, Price.');
      return;
    }

    setError('');
    setSubmittedData(formData);
    console.log('Property Details:', formData);
  };

  return (
    <Container className="mt-4">
      <h1 className="text-2xl font-bold mb-4">Property Sales Assistant</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Property Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street address"
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Postal Code"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Property Size (sq m)</Form.Label>
              <Form.Control
                type="number"
                name="size"
                value={formData.size}
                onChange={handleChange}
                placeholder="e.g., 120"
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Estimated Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g., 500000"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Year Built</Form.Label>
              <Form.Control
                type="number"
                name="yearBuilt"
                value={formData.yearBuilt}
                onChange={handleChange}
                placeholder="e.g., 1995"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Bedrooms</Form.Label>
              <Form.Control
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Bathrooms</Form.Label>
              <Form.Control
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Property Type</Form.Label>
          <Form.Select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="">Select type</option>
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Townhouse">Townhouse</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Neighborhood Notes</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Close to parks, good schools, quiet street"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Additional Features</Form.Label>
          <Form.Control
            type="text"
            name="features"
            value={formData.features}
            onChange={handleChange}
            placeholder="Garage, garden, renovations, etc."
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      {submittedData && (
        <Alert variant="success" className="mt-4">
          <h5>Property Submitted:</h5>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </Alert>
      )}
    </Container>
  );
}

export default PropertyDetailsForm;