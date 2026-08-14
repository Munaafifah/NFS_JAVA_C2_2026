import { describe, it, expect } from 'vitest';
import { filterTickets } from './tickets.js';

const sampleTickets = [
  { id: 'T001', title: 'Cannot access email', category: 'Email', status: 'OPEN', priority: 'HIGH' },
  { id: 'T002', title: 'Laptop running slowly', category: 'Hardware', status: 'IN_PROGRESS', priority: 'MEDIUM' },
  { id: 'T003', title: 'Password reset request', category: 'Account', status: 'CLOSED', priority: 'LOW' }
];

describe('filterTickets', () => {
  it('filters by search text matching the title', () => {
    const result = filterTickets(sampleTickets, 'email', 'ALL', 'ALL');

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('T001');
  });

  it('filters by search text matching the category', () => {
    const result = filterTickets(sampleTickets, 'hardware', 'ALL', 'ALL');

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('T002');
  });

  it('filters by status', () => {
    const result = filterTickets(sampleTickets, '', 'CLOSED', 'ALL');

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('T003');
  });

  it('filters by search text and status together', () => {
    const result = filterTickets(sampleTickets, 'password', 'CLOSED', 'ALL');

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('T003');
  });

  it('returns no tickets when search text and status do not both match the same ticket', () => {
    const result = filterTickets(sampleTickets, 'email', 'CLOSED', 'ALL');

    expect(result).toHaveLength(0);
  });

  it('returns all tickets when search is empty and status is ALL', () => {
    const result = filterTickets(sampleTickets, '', 'ALL', 'ALL');

    expect(result).toHaveLength(3);
  });

  it('search is case-insensitive', () => {
    const result = filterTickets(sampleTickets, 'EMAIL', 'ALL', 'ALL');

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('T001');
  });
});