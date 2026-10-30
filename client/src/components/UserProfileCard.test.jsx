import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import UserProfileCard from './UserProfileCard.jsx';

const mockUser = {
  name: 'Taylor Swift',
  email: 'taylor@policymanager.io',
  role: 'Risk Specialist',
  department: 'Underwriting Services',
  phone: '+1 800 555 1234',
  activePoliciesCount: 8,
};

describe('UserProfileCard Component', () => {
  it('renders user details accurately', () => {
    render(<UserProfileCard user={mockUser} onEdit={() => {}} />);

    expect(screen.getByTestId('profile-name').textContent).toBe('Taylor Swift');
    expect(screen.getByTestId('profile-role').textContent).toBe('Risk Specialist');
    expect(screen.getByTestId('profile-email').textContent).toBe('taylor@policymanager.io');
    expect(screen.getByTestId('profile-dept').textContent).toBe('Underwriting Services');
    expect(screen.getByTestId('profile-phone').textContent).toBe('+1 800 555 1234');
    expect(screen.getByTestId('profile-policies-count').textContent).toBe('8 Policies');
  });

  it('triggers onEdit callback when Edit Profile button is clicked', () => {
    const handleEdit = vi.fn();
    render(<UserProfileCard user={mockUser} onEdit={handleEdit} />);

    fireEvent.click(screen.getByRole('button', { name: /Edit Profile/i }));
    expect(handleEdit).toHaveBeenCalledTimes(1);
  });
});

