import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import App from './App.jsx';

describe('App Routing & Route Protection', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('redirects unauthenticated user accessing root to /login', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /Sign In to Dashboard/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
  });

  it('renders login page directly on /login route', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Policy Management Dashboard')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In to Dashboard/i })).toBeInTheDocument();
  });

  it('renders not found page on unknown route', () => {
    render(
      <MemoryRouter initialEntries={['/some-unrecognized-route']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
  });
});
