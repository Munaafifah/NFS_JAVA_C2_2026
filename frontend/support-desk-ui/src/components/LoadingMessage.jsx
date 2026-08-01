export default function LoadingMessage({ message = 'Loading...' }) {
  return (
    <p className="message loading-message" role="status">
      {message}
    </p>
  );
}