import { render, screen } from '@testing-library/react';
import App from './App';

test('renders without crashing', () => {
  render(<App />);
  // expect(screen.toBeInTheDocument('root'))
  // expect(getByApp('App')).toBeInTheDocument();
});

test('renders the title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Music Festival/i);
  expect(linkElement).toBeInTheDocument();
});

