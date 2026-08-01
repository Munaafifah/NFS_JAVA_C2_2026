import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import TicketDetail from '../components/TicketDetail.jsx';
import TicketFilterPanel from '../components/TicketFilterPanel.jsx';
import TicketList from '../components/TicketList.jsx';
import TicketSummaryCards from '../components/TicketSummaryCards.jsx';
import ErrorMessage from '../components/ErrorMessage.jsx';
import LoadingMessage from '../components/LoadingMessage.jsx';
import { useTicketData } from '../context/TicketDataContext.jsx';

export default function TicketsPage() {
  const navigate = useNavigate();
  const initialLoadRef = useRef(false);

  const {
    items,
    visibleTickets,
    selectedTicket,
    selectedTicketId,
    loading,
    error,
    filters,
    loadTicketsPage,
    setSearchText,
    setStatusFilter,
    setPriorityFilter,
    selectTicket
  } = useTicketData();

  useEffect(() => {
    if (initialLoadRef.current) {
      return;
    }

    initialLoadRef.current = true;
    loadTicketsPage();
  }, [loadTicketsPage]);

  if (loading && items.length === 0) {
    return <LoadingMessage message="Loading tickets..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <>
      <div className="card action-row header-row">
        <h2>Tickets</h2>
        <div className="action-row">
          <button type="button" className="button-link" onClick={() => navigate('/app/tickets/new')}>
            New Ticket
          </button>
          <button
            type="button"
            className="button-link secondary"
            disabled={!selectedTicket}
            onClick={() => navigate(`/app/tickets/${selectedTicket.id}/edit`)}
          >
            Edit Selected
          </button>
        </div>
      </div>

      <TicketSummaryCards tickets={items} />

      <TicketFilterPanel
        searchText={filters.searchText}
        onSearchChange={setSearchText}
        statusFilter={filters.statusFilter}
        onStatusChange={setStatusFilter}
        priorityFilter={filters.priorityFilter}
        onPriorityChange={setPriorityFilter}
      />

      <section className="workspace-grid">
        <TicketList
          tickets={visibleTickets}
          selectedId={selectedTicketId || selectedTicket?.id}
          onSelect={selectTicket}
        />
        <TicketDetail ticket={selectedTicket} />
      </section>
    </>
  );
}