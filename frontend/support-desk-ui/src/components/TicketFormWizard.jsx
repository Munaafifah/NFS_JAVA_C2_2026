import { useState } from 'react';
import ErrorMessage from './ErrorMessage.jsx';
import {
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  validateTicketForm,
  normalizeTicketFormPayload
} from '../utils/ticketFormValidation.js';

export const emptyTicketForm = {
  title: '',
  description: '',
  category: '',
  priority: 'MEDIUM',
  status: 'OPEN'
};

export default function TicketFormWizard({
  mode = 'create',
  initialValues = emptyTicketForm,
  onSubmit,
  saving = false,
  serverError = null,
  successMessage = null
}) {
  const [formValues, setFormValues] = useState(initialValues);
  const [fieldErrors, setFieldErrors] = useState({});

  const isEditMode = mode === 'edit';

  function updateField(fieldName, value) {
    setFormValues((current) => ({ ...current, [fieldName]: value }));
    setFieldErrors((current) => ({ ...current, [fieldName]: null }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const errors = validateTicketForm(formValues);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    await onSubmit(normalizeTicketFormPayload(formValues));
  }

  return (
    <form className="card ticket-form" onSubmit={handleSubmit} noValidate>
      <div className="section-heading">
        <p className="eyebrow">Day 13 ticket form</p>
        <h2>{isEditMode ? 'Update Ticket' : 'Create Ticket'}</h2>
        <p>
          {isEditMode
            ? 'Controlled inputs with inline validation.'
            : 'Controlled inputs with inline validation. New tickets always start as OPEN.'}
        </p>
      </div>

      <ErrorMessage message={serverError} />
      {successMessage && <p className="message success-message">{successMessage}</p>}

      <section className="form-grid" aria-label="Ticket details">
        <label htmlFor="title" className="form-grid-full">
          Title
          <input
            id="title"
            value={formValues.title}
            onChange={(event) => updateField('title', event.target.value)}
            aria-describedby="title-error"
          />
          {fieldErrors.title && (
            <span id="title-error" className="field-error" role="alert">{fieldErrors.title}</span>
          )}
        </label>

        <label htmlFor="description" className="form-grid-full">
          Description
          <textarea
            id="description"
            rows={4}
            value={formValues.description}
            onChange={(event) => updateField('description', event.target.value)}
            aria-describedby="description-error"
          />
          {fieldErrors.description && (
            <span id="description-error" className="field-error" role="alert">{fieldErrors.description}</span>
          )}
        </label>

        <label htmlFor="category">
          Category
          <input
            id="category"
            value={formValues.category}
            onChange={(event) => updateField('category', event.target.value)}
            aria-describedby="category-error"
          />
          {fieldErrors.category && (
            <span id="category-error" className="field-error" role="alert">{fieldErrors.category}</span>
          )}
        </label>

        <label htmlFor="priority">
          Priority
          <select
            id="priority"
            value={formValues.priority}
            onChange={(event) => updateField('priority', event.target.value)}
            aria-describedby="priority-error"
          >
            {PRIORITY_OPTIONS.map((priority) => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
          {fieldErrors.priority && (
            <span id="priority-error" className="field-error" role="alert">{fieldErrors.priority}</span>
          )}
        </label>

        <label htmlFor="status">
          Status
          {isEditMode ? (
            <select
              id="status"
              value={formValues.status}
              onChange={(event) => updateField('status', event.target.value)}
              aria-describedby="status-error"
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          ) : (
            <input id="status" value={formValues.status} disabled readOnly aria-describedby="status-error" />
          )}
          {fieldErrors.status && (
            <span id="status-error" className="field-error" role="alert">{fieldErrors.status}</span>
          )}
        </label>
      </section>

      <div className="form-actions">
        <button type="submit" className="button-link" disabled={saving}>
          {saving ? 'Saving...' : isEditMode ? 'Update Ticket' : 'Create Ticket'}
        </button>
      </div>
    </form>
  );
}