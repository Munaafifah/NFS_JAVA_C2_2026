import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { fetchPagedTickets } from '../services/api.js';
import { filterTickets } from '../utils/tickets.js';
import { useAuth } from './AuthContext.jsx';

const TicketDataContext = createContext(null);

const initialState = {
  items: [],
  selectedTicketId: '',
  loading: false,
  error: '',
  pageInfo: {
    page: 0,
    size: 5,
    sortBy: 'createdAt',
    direction: 'desc',
    totalPages: 0,
    totalElements: 0
  },
  filters: {
    searchText: '',
    statusFilter: 'ALL',
    priorityFilter: 'ALL'
  }
};

function toPageInfo(data, fallback) {
  return {
    page: data.number ?? fallback.page,
    size: data.size ?? fallback.size,
    sortBy: fallback.sortBy,
    direction: fallback.direction,
    totalPages: data.totalPages ?? 0,
    totalElements: data.totalElements ?? 0
  };
}

function ticketReducer(state, action) {
  switch (action.type) {
    case 'LOAD_START':
      return {
        ...state,
        loading: true,
        error: ''
      };

    case 'LOAD_SUCCESS': {
      const items = action.data.content ?? [];
      const selectedStillVisible = items.some((ticket) => ticket.id === state.selectedTicketId);
      const selectedTicketId = selectedStillVisible ? state.selectedTicketId : items[0]?.id ?? '';

      return {
        ...state,
        items,
        selectedTicketId,
        loading: false,
        error: '',
        pageInfo: toPageInfo(action.data, action.params)
      };
    }

    case 'LOAD_ERROR':
      return {
        ...state,
        loading: false,
        error: action.message
      };

    case 'SET_SEARCH_TEXT':
      return {
        ...state,
        filters: { ...state.filters, searchText: action.value }
      };

    case 'SET_STATUS_FILTER':
      return {
        ...state,
        filters: { ...state.filters, statusFilter: action.value }
      };

    case 'SET_PRIORITY_FILTER':
      return {
        ...state,
        filters: { ...state.filters, priorityFilter: action.value }
      };

    case 'SELECT_TICKET':
      return {
        ...state,
        selectedTicketId: action.ticketId
      };

    default:
      return state;
  }
}

export function TicketDataProvider({ children }) {
  const { token } = useAuth();
  const [state, dispatch] = useReducer(ticketReducer, initialState);

  const loadTicketsPage = useCallback(async (overrides = {}) => {
    const params = {
      page: overrides.page ?? state.pageInfo.page,
      size: overrides.size ?? state.pageInfo.size,
      sortBy: overrides.sortBy ?? state.pageInfo.sortBy,
      direction: overrides.direction ?? state.pageInfo.direction
    };

    dispatch({ type: 'LOAD_START' });

    try {
      const data = await fetchPagedTickets(token, params);
      dispatch({ type: 'LOAD_SUCCESS', data, params });
    } catch (error) {
      dispatch({
        type: 'LOAD_ERROR',
        message: error.message || 'Could not load paged tickets.'
      });
    }
  }, [state.pageInfo, token]);

  const setSearchText = useCallback((value) => {
    dispatch({ type: 'SET_SEARCH_TEXT', value });
  }, []);

  const setStatusFilter = useCallback((value) => {
    dispatch({ type: 'SET_STATUS_FILTER', value });
  }, []);

  const setPriorityFilter = useCallback((value) => {
    dispatch({ type: 'SET_PRIORITY_FILTER', value });
  }, []);

  const selectTicket = useCallback((ticketId) => {
    dispatch({ type: 'SELECT_TICKET', ticketId });
  }, []);

  const visibleTickets = useMemo(
    () => filterTickets(
      state.items,
      state.filters.searchText,
      state.filters.statusFilter,
      state.filters.priorityFilter
    ),
    [state.items, state.filters]
  );

  const selectedTicket = useMemo(() => {
    return visibleTickets.find((ticket) => ticket.id === state.selectedTicketId) ?? visibleTickets[0] ?? null;
  }, [state.selectedTicketId, visibleTickets]);

  const value = useMemo(
    () => ({
      ...state,
      visibleTickets,
      selectedTicket,
      loadTicketsPage,
      setSearchText,
      setStatusFilter,
      setPriorityFilter,
      selectTicket
    }),
    [state, visibleTickets, selectedTicket, loadTicketsPage, setSearchText, setStatusFilter, setPriorityFilter, selectTicket]
  );

  return <TicketDataContext.Provider value={value}>{children}</TicketDataContext.Provider>;
}

export function useTicketData() {
  const value = useContext(TicketDataContext);

  if (!value) {
    throw new Error('useTicketData must be used inside TicketDataProvider');
  }

  return value;
}