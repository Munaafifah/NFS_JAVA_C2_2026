export default function ErrorMessage({ message }) {
  if (!message) {
    return null;
  }

  return (
    <p className="message error-message" role="alert">
      {message}
    </p>
  );
}