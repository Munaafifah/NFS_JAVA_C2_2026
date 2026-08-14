import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import { useAuth } from '../context/AuthContext';

vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn()
}));

function renderProtectedRoute(initialPath) {
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/login" element={<h1>Login Page</h1>} />
        <Route element={<ProtectedRoute />}>
          <Route path="/app/tickets" element={<h1>Protected Tickets</h1>} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}

describe('ProtectedRoute', () => {
  it('redirects an unauthenticated user to the login page', () => {
    useAuth.mockReturnValue({ isAuthenticated: false });

    renderProtectedRoute('/app/tickets');

    expect(screen.getByRole('heading', { name: 'Login Page' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Protected Tickets' })).not.toBeInTheDocument();
  });

  it('allows an authenticated user to view the protected ticket page', () => {
    useAuth.mockReturnValue({ isAuthenticated: true });

    renderProtectedRoute('/app/tickets');

    expect(screen.getByRole('heading', { name: 'Protected Tickets' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Login Page' })).not.toBeInTheDocument();
  });
});