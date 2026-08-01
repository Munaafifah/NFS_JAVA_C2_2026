import { useState } from 'react';
import ErrorMessage from './ErrorMessage.jsx';

const PRIORITY_OPTIONS = ['LOW', 'MEDIUM', 'HIGH'];

export const emptyTicketForm = {
  title: '',
  description: '',
  category: '',
  priority: 'MEDIUM'
};

export default function TicketFormWizard({
  initialValues = emptyTicketForm,
  onSubmit,
  saving = false,
  serverError = null,
  successMessage = null
}) {
  const [formValues, setFormValues] = useState(initialValues);
  const [fieldErrors, setFieldErrors] = useState({});

  function updateField(fieldName, value) {
    setFormValues((current) => ({ ...current, [fieldName]: value }));
    setFieldErrors((current) => ({ ...current, [fieldName]: null }));
  }

  function validate() {
    const errors = {};

    if (!formValues.title.trim()) {
      errors.title = 'Title is required.';
    }
    if (!formValues.description.trim()) {
      errors.description = 'Description is required.';
    }
    if (!formValues.category.trim()) {
      errors.category = 'Category is required.';
    }
    if (!PRIORITY_OPTIONS.includes(formValues.priority)) {
      errors.priority = 'Choose a valid priority.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    const payload = {
      title: formValues.title.trim(),
      description: formValues.description.trim(),
      category: formValues.category.trim(),
      priority: formValues.priority
    };

    await onSubmit(payload);
  }

  return (
    <form className="card ticket-form" onSubmit={handleSubmit} noValidate>
      <div className="section-heading">
        <p className="eyebrow">Day 13 ticket form</p>
        <h2>Create Ticket</h2>
        <p>Controlled inputs with inline validation. New tickets always start as OPEN.</p>
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
          <input id="status" value="OPEN" disabled readOnly />
        </label>
      </section>

      <div className="form-actions">
        <button type="submit" className="button-link" disabled={saving}>
          {saving ? 'Saving...' : 'Create Ticket'}
        </button>
      </div>
    </form>
  );
}