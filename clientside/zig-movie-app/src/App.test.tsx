import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

it('renders without crashing', () => {
  // Create a temporary div container
  const div = document.createElement('div');

  // Create a React root
  const root = createRoot(div);

  // Render App
  root.render(<App />);

  // Clean up
  root.unmount();
});
