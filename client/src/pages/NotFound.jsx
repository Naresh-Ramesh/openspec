import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ padding: '24px' }}>
      <h2>404 - Page Not Found</h2>
      <p>The page you requested does not exist.</p>
      <Link to="/" style={{ color: '#2b6cb0' }}>Return to Dashboard</Link>
    </div>
  );
}

