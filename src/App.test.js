import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders the property details form on the home route', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  // Look for something that exists in your PropertyDetailsForm
  const element = screen.getByText(/property/i);
  expect(element).toBeInTheDocument();
});
