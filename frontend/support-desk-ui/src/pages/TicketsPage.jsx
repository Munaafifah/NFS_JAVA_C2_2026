import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import TicketDetail from '../components/TicketDetail.jsx';
import TicketFilterPanel from '../components/TicketFilterPanel.jsx';
import TicketList from '../components/TicketList.jsx';
import TicketSummaryCards from '../components/TicketSummaryCards.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingMessage from '../components/LoadingMessage.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { fetchTickets } from '../services/api.js';
import { filterTickets } from '../utils/tickets.js';

export default function TicketsPage() {
  const { token } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const filteredTickets = useMemo(
    () => filterTickets(tickets, searchText, statusFilter, priorityFilter),
    [tickets, searchText, statusFilter, priorityFilter]
  );

  const selectedTicket = filteredTickets.find((ticket) => ticket.id === selectedId) ?? null;

  useEffect(() => {
    let ignore = false;

    async function loadTickets() {
      try {
        setLoading(true);
        setError('');
        const data = await fetchTickets(token);

        if (!ignore) {
          setTickets(data);
          setSelectedId(data[0]?.id ?? null);
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Could not load tickets.');
          console.error(err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadTickets();

    return () => {
      ignore = true;
    };
  }, [token]);

  useEffect(() => {
    if (filteredTickets.length === 0) {
      setSelectedId(null);
      return;
    }

    const selectedStillVisible = filteredTickets.some((ticket) => ticket.id === selectedId);
    if (!selectedStillVisible) {
      setSelectedId(filteredTickets[0].id);
    }
  }, [filteredTickets, selectedId]);

  if (loading) {
    return <LoadingMessage message="Loading tickets..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <div className="card action-row header-row">
        <h2>Tickets</h2>
        <Link className="button-link" to="/app/tickets/new">
          New Ticket
        </Link>
      </div>

      <TicketSummaryCards tickets={tickets} />

      <TicketFilterPanel
        searchText={searchText}
        onSearchChange={setSearchText}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
      />

      <section className="workspace-grid">
        <TicketList
          tickets={filteredTickets}
          selectedId={selectedTicket?.id}
          onSelect={setSelectedId}
        />
        <TicketDetail ticket={selectedTicket} />
      </section>
    </>
  );
}