import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');

axios.get.mockResolvedValue({
  data: { events: [{ name: 'Sample Event', date: '2023-12-12' }] },
});

test('renders main application component', async () => {
  await act(async () => {
    render(<App />);
  });

  const headingElements = screen.getAllByText(/Calgary Laughter Yoga and Adventures/i);
  expect(headingElements.length).toBeGreaterThan(0);
});
