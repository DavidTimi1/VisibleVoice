import { render, screen } from '@testing-library/react';
import TechFestApp from './App';

test('renders learn react link', () => {
  render(<TechFestApp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
