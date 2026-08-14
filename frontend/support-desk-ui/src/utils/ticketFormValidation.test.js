import { describe, it, expect } from 'vitest';
import { validateTicketForm } from './ticketFormValidation.js';

describe('validateTicketForm', () => {
  it('returns no errors for a valid form', () => {
    const errors = validateTicketForm({
      title: 'Printer not working',
      description: 'Office printer on Level 3 is not responding.',
      category: 'Hardware',
      priority: 'MEDIUM',
      status: 'OPEN'
    });
    expect(errors).toEqual({});
  });

  it('flags a missing title', () => {
    const errors = validateTicketForm({
      title: '',
      description: 'Some description',
      category: 'Hardware',
      priority: 'MEDIUM',
      status: 'OPEN'
    });
    expect(errors.title).toBe('Title is required.');
  });

  it('flags an invalid priority', () => {
    const errors = validateTicketForm({
      title: 'Printer not working',
      description: 'Some description',
      category: 'Hardware',
      priority: 'URGENT',
      status: 'OPEN'
    });
    expect(errors.priority).toBe('Choose a valid priority.');
  });
});