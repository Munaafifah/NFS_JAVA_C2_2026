export const PRIORITY_OPTIONS = ['LOW', 'MEDIUM', 'HIGH'];
export const STATUS_OPTIONS = ['OPEN', 'IN_PROGRESS', 'CLOSED'];

/**
 * Validates ticket form values.
 * Returns an object of fieldName -> error message.
 * An empty object means the form is valid.
 */
export function validateTicketForm(formValues) {
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
  if (!STATUS_OPTIONS.includes(formValues.status)) {
    errors.status = 'Status is required.';
  }

  return errors;
}

/**
 * Converts raw form values into the trimmed payload shape
 * expected by the backend create/update endpoints.
 */
export function normalizeTicketFormPayload(formValues) {
  return {
    title: formValues.title.trim(),
    description: formValues.description.trim(),
    category: formValues.category.trim(),
    priority: formValues.priority,
    status: formValues.status
  };
}