import { useEffect, useState } from "react";
import { fetchApiInfo } from "../services/api";

export default function ApiInfoCard() {
  const [apiInfo, setApiInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    fetchApiInfo()
      .then((data) => {
        if (isMounted) {
          setApiInfo(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="card">
      <h2>Backend Connection</h2>
      <p className="header-subtitle" style={{ color: "#667085", marginBottom: "12px" }}>
        Fetched using useEffect from the public backend endpoint.
      </p>

      {loading && <p className="message loading-message">Loading API info...</p>}

      {!loading && error && (
        <p className="message error-message">
          Could not connect to backend. Start Spring Boot on port 8081 and try again.
        </p>
      )}

      {!loading && !error && apiInfo && (
        <div className="detail-list">
          <div>
            <dt>API Name</dt>
            <dd>{apiInfo.name}</dd>
          </div>
          <div>
            <dt>Version</dt>
            <dd>{apiInfo.version}</dd>
          </div>
        </div>
      )}
    </div>
  );
}