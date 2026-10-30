import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProfileEditForm from './ProfileEditForm.jsx';

const mockUser = {
  name: 'Alex Morgan',
  email: 'alex@policymanager.io',
  role: 'Underwriter',
  department: 'Commercial',
  phone: '555-0199',
};

describe('ProfileEditForm Component', () => {
  it('prefills inputs with existing user values', () => {
    render(<ProfileEditForm user={mockUser} onSave={() => {}} onCancel={() => {}} />);

    expect(screen.getByLabelText(/Full Name/i)).toHaveValue('Alex Morgan');
    expect(screen.getByLabelText(/Email Address/i)).toHaveValue('alex@policymanager.io');
    expect(screen.getByLabelText(/Role Title/i)).toHaveValue('Underwriter');
    expect(screen.getByLabelText(/Department/i)).toHaveValue('Commercial');
    expect(screen.getByLabelText(/Phone Number/i)).toHaveValue('555-0199');
  });

  it('validates required fields and email format', () => {
    render(<ProfileEditForm user={mockUser} onSave={() => {}} onCancel={() => {}} />);

    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: '' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'not-an-email' } });

    fireEvent.click(screen.getByRole('button', { name: /Save Changes/i }));

    expect(screen.getByText('Full name is required')).toBeInTheDocument();
    expect(screen.getByText('Please provide a valid email format')).toBeInTheDocument();
  });

  it('calls onSave with updated data when form is valid', () => {
    const handleSave = vi.fn();
    render(<ProfileEditForm user={mockUser} onSave={handleSave} onCancel={() => {}} />);

    fireEvent.change(screen.getByLabelText(/Full Name/i), { target: { value: 'Alexandra Morgan' } });
    fireEvent.change(screen.getByLabelText(/Email Address/i), { target: { value: 'alexandra@policymanager.io' } });

    fireEvent.click(screen.getByRole('button', { name: /Save Changes/i }));

    expect(handleSave).toHaveBeenCalledWith({
      name: 'Alexandra Morgan',
      email: 'alexandra@policymanager.io',
      role: 'Underwriter',
      department: 'Commercial',
      phone: '555-0199',
    });
  });

  it('triggers onCancel when Cancel button or close icon is clicked', () => {
    const handleCancel = vi.fn();
    render(<ProfileEditForm user={mockUser} onSave={() => {}} onCancel={handleCancel} />);

    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(handleCancel).toHaveBeenCalledTimes(1);
  });
});

