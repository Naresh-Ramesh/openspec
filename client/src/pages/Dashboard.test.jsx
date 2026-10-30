import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Dashboard from './Dashboard.jsx';
import { AuthProvider } from '../context/AuthContext.jsx';

describe('Dashboard Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders metrics, user details, and policy records', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Overview & Underwriter Profile')).toBeInTheDocument();
    expect(screen.getByText('Total Active Policies')).toBeInTheDocument();
    expect(screen.getByText('Total Premium Volume')).toBeInTheDocument();
    expect(screen.getByTestId('profile-name')).toHaveTextContent('Alex Morgan');
    expect(screen.getAllByText('Assigned Policies').length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Apex Logistics LLC')).toBeInTheDocument();
  });

  it('toggles edit form and successfully updates user profile details', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Edit Profile/i }));

    expect(screen.getByText('Edit User Details')).toBeInTheDocument();
    const nameInput = screen.getByLabelText(/Full Name/i);
    fireEvent.change(nameInput, { target: { value: 'Alexander Hamilton' } });

    fireEvent.click(screen.getByRole('button', { name: /Save Changes/i }));

    expect(screen.getByText('Profile details updated successfully.')).toBeInTheDocument();
    expect(screen.getByTestId('profile-name')).toHaveTextContent('Alexander Hamilton');
  });

  it('cancels editing and reverts to user profile card without saving uncommitted changes', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /Edit Profile/i }));

    const nameInput = screen.getByLabelText(/Full Name/i);
    fireEvent.change(nameInput, { target: { value: 'Temporary Name' } });

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));

    expect(screen.queryByText('Edit User Details')).not.toBeInTheDocument();
    expect(screen.getByTestId('profile-name')).toHaveTextContent('Alex Morgan');
  });
});
