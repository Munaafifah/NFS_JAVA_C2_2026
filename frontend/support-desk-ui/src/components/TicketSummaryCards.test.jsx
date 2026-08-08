import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import TicketSummaryCards from './TicketSummaryCards.jsx';

const sampleTickets = [
  { id: 'T001', title: 'Cannot access email', status: 'OPEN', priority: 'HIGH' },
  { id: 'T002', title: 'Laptop running slowly', status: 'IN_PROGRESS', priority: 'MEDIUM' },
  { id: 'T003', title: 'Password reset request', status: 'CLOSED', priority: 'LOW' },
  { id: 'T004', title: 'VPN not connecting', status: 'OPEN', priority: 'HIGH' }
];

describe('TicketSummaryCards', () => {
  it('renders all four card labels', () => {
    render(<TicketSummaryCards tickets={sampleTickets} />);

    expect(screen.getByText('Total Tickets')).toBeInTheDocument();
    expect(screen.getByText('Open')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Closed')).toBeInTheDocument();
  });

  it('displays the correct total ticket count', () => {
    render(<TicketSummaryCards tickets={sampleTickets} />);

    const card = screen.getByText('Total Tickets').closest('article');
    expect(within(card).getByText('4')).toBeInTheDocument();
  });

  it('displays the correct open ticket count', () => {
    render(<TicketSummaryCards tickets={sampleTickets} />);

    const card = screen.getByText('Open').closest('article');
    expect(within(card).getByText('2')).toBeInTheDocument();
  });

  it('displays the correct in progress ticket count', () => {
    render(<TicketSummaryCards tickets={sampleTickets} />);

    const card = screen.getByText('In Progress').closest('article');
    expect(within(card).getByText('1')).toBeInTheDocument();
  });

  it('displays the correct closed ticket count', () => {
    render(<TicketSummaryCards tickets={sampleTickets} />);

    const card = screen.getByText('Closed').closest('article');
    expect(within(card).getByText('1')).toBeInTheDocument();
  });

  it('displays zero counts when given an empty ticket list', () => {
    render(<TicketSummaryCards tickets={[]} />);

    const totalCard = screen.getByText('Total Tickets').closest('article');
    expect(within(totalCard).getByText('0')).toBeInTheDocument();

    const openCard = screen.getByText('Open').closest('article');
    expect(within(openCard).getByText('0')).toBeInTheDocument();
  });
});