// Hardened from an initial AI draft that used vague test names and a
// weak assertion (expect(errors).toBeTruthy(), which passes even on {}
// since an empty object is truthy). Added exact-message checks, a
// combined-error case, full enum coverage, and multi-field trimming.

import { describe, it, expect } from 'vitest';
import {
  validateTicketForm,
  normalizeTicketFormPayload,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS
} from './ticketFormValidation.js';

const validForm = {
  title: 'Printer not working',
  description: 'The office printer on level 3 is jammed.',
  category: 'Hardware',
  priority: 'HIGH',
  status: 'OPEN'
};

describe('validateTicketForm', () => {
  it('returns no errors for a fully valid form', () => {
    expect(validateTicketForm(validForm)).toEqual({});
  });

  it('flags a missing title', () => {
    const errors = validateTicketForm({ ...validForm, title: '   ' });
    expect(errors.title).toBe('Title is required.');
  });

  it('flags a missing description', () => {
    const errors = validateTicketForm({ ...validForm, description: '' });
    expect(errors.description).toBe('Description is required.');
  });

  it('flags a missing category', () => {
    const errors = validateTicketForm({ ...validForm, category: '' });
    expect(errors.category).toBe('Category is required.');
  });

  it('flags an invalid priority value', () => {
    const errors = validateTicketForm({ ...validForm, priority: 'URGENT' });
    expect(errors.priority).toBe('Choose a valid priority.');
  });

  it('flags an invalid status value', () => {
    const errors = validateTicketForm({ ...validForm, status: 'ARCHIVED' });
    expect(errors.status).toBe('Status is required.');
  });

  it('reports every invalid field at once, not just the first one found', () => {
    const errors = validateTicketForm({
      title: '',
      description: '',
      category: '',
      priority: 'URGENT',
      status: 'ARCHIVED'
    });
    expect(Object.keys(errors).sort()).toEqual(
      ['category', 'description', 'priority', 'status', 'title'].sort()
    );
  });

  it('accepts every documented priority option', () => {
    PRIORITY_OPTIONS.forEach((priority) => {
      expect(validateTicketForm({ ...validForm, priority }).priority).toBeUndefined();
    });
  });

  it('accepts every documented status option', () => {
    STATUS_OPTIONS.forEach((status) => {
      expect(validateTicketForm({ ...validForm, status }).status).toBeUndefined();
    });
  });
});

describe('normalizeTicketFormPayload', () => {
  it('trims whitespace from text fields', () => {
    const payload = normalizeTicketFormPayload({
      ...validForm,
      title: '  Printer not working  ',
      description: '  Jammed on level 3  ',
      category: '  Hardware  '
    });

    expect(payload).toEqual({
      title: 'Printer not working',
      description: 'Jammed on level 3',
      category: 'Hardware',
      priority: 'HIGH',
      status: 'OPEN'
    });
  });

  it('does not alter priority or status values', () => {
    const payload = normalizeTicketFormPayload(validForm);
    expect(payload.priority).toBe('HIGH');
    expect(payload.status).toBe('OPEN');
  });
});