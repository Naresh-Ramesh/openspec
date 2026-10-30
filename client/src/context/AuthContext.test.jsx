import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { AuthProvider, useAuth } from './AuthContext.jsx';

function TestConsumer() {
  const { isAuthenticated, user, login, updateProfile, logout } = useAuth();

  return (
    <div>
      <div data-testid="auth-status">{isAuthenticated ? 'authenticated' : 'unauthenticated'}</div>
      <div data-testid="user-name">{user?.name}</div>
      <div data-testid="user-email">{user?.email}</div>
      <button onClick={() => login('test@example.com', 'password123')}>Login Valid</button>
      <button onClick={() => login('bademail', '123')}>Login Invalid</button>
      <button onClick={() => updateProfile({ name: 'Jane Doe', email: 'jane@example.com' })}>Update Profile</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with unauthenticated status', () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-status').textContent).toBe('unauthenticated');
    expect(screen.getByTestId('user-name').textContent).toBe('Alex Morgan');
  });

  it('authenticates user with valid credentials', async () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByText('Login Valid').click();
    });

    expect(screen.getByTestId('auth-status').textContent).toBe('authenticated');
    expect(screen.getByTestId('user-email').textContent).toBe('test@example.com');
  });

  it('rejects invalid login credentials without authenticating', async () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByText('Login Invalid').click();
    });

    expect(screen.getByTestId('auth-status').textContent).toBe('unauthenticated');
  });

  it('updates profile fields and persists changes', async () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByText('Update Profile').click();
    });

    expect(screen.getByTestId('user-name').textContent).toBe('Jane Doe');
    expect(screen.getByTestId('user-email').textContent).toBe('jane@example.com');
  });

  it('logs out and clears authentication status', async () => {
    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    await act(async () => {
      screen.getByText('Login Valid').click();
    });
    expect(screen.getByTestId('auth-status').textContent).toBe('authenticated');

    await act(async () => {
      screen.getByText('Logout').click();
    });
    expect(screen.getByTestId('auth-status').textContent).toBe('unauthenticated');
  });
});

