import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TicketFormWizard from './TicketFormWizard.jsx';

describe('TicketFormWizard', () => {
  it('shows inline errors and does not call onSubmit when required fields are empty', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<TicketFormWizard onSubmit={handleSubmit} />);

    await user.click(screen.getByRole('button', { name: 'Create Ticket' }));

    expect(screen.getByText('Title is required.')).toBeInTheDocument();
    expect(screen.getByText('Description is required.')).toBeInTheDocument();
    expect(screen.getByText('Category is required.')).toBeInTheDocument();
    expect(handleSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with clean payload data when the form is valid', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<TicketFormWizard onSubmit={handleSubmit} />);

    await user.type(screen.getByLabelText('Title'), '  Printer not working  ');
    await user.type(screen.getByLabelText('Description'), '  Printer on 3rd floor is offline.  ');
    await user.type(screen.getByLabelText('Category'), '  Hardware  ');

    await user.click(screen.getByRole('button', { name: 'Create Ticket' }));

    expect(handleSubmit).toHaveBeenCalledTimes(1);
    expect(handleSubmit).toHaveBeenCalledWith({
      title: 'Printer not working',
      description: 'Printer on 3rd floor is offline.',
      category: 'Hardware',
      priority: 'MEDIUM',
      status: 'OPEN'
    });
  });

  it('shows a saving state on the submit button when saving is true', () => {
    render(<TicketFormWizard onSubmit={vi.fn()} saving={true} />);

    const button = screen.getByRole('button', { name: 'Saving...' });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });
});