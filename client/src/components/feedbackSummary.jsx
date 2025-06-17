import React, { useEffect, useState } from "react";
import { ThumbsUp, ThumbsDown, HelpCircle, Loader } from "lucide-react";
import "../styles/feedbackSummary.css";

const FEEDBACK_API = "http://localhost:8000/feedback?restaurant_name=";

export const FeedbackSummary = ({ selectedRestaurant }) => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!selectedRestaurant) return;

    const fetchFeedback = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(
          FEEDBACK_API + encodeURIComponent(selectedRestaurant.label)
        );
        if (!response.ok)
          throw new Error("Error al obtener el analisis de feedback");
        const data = await response.json();
        setSummary(data);
      } catch (err) {
        setError(err.message + " verify google maps API key");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [selectedRestaurant]);

  if (!selectedRestaurant) {
    return (
      <>
        <div className="feedback-message">
          Selecciona un restaurante para ver el analisis de reviews.
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <div className="feedback-loading">
        <Loader className="spin" />
        Cargando analisis...
      </div>
    );
  }

  if (error) {
    return <div className="feedback-error">{error}</div>;
  }

  if (!summary) return null;

  const renderSection = (title, Icon, reviews) => (
    <div className="feedback-section">
      <h3>
        <Icon style={{ width: 20, height: 20, color: "#4a5568" }} />
        {title}
      </h3>
      {reviews.length === 0 ? (
        <p>No hay reviews disponibles.</p>
      ) : (
        <ul className="feedback-reviews">
          {reviews.map((r, idx) => (
            <li key={idx} className="feedback-review-item">
              <div>
                <strong>{r.author_name}</strong>⭐ {r.rating} -{" "}
                <em>{r.relative_time_description}</em>
              </div>
              <strong>
                ({r.sentiment} - confianza: {(r.confidence * 100).toFixed(1)}%)
              </strong>
              <p>{r.text}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">
        Analisis de reviews para: <span>{selectedRestaurant.label}</span>
      </h2>
      <p>
        <strong>Direccion:</strong> {summary.address}
      </p>
      <p>
        <strong>Resumen:</strong> {summary.summary}
      </p>

      {renderSection("Reviews Positivos", ThumbsUp, summary.positives)}
      {renderSection("Reviews Neutrales", HelpCircle, summary.neutrals)}
      {renderSection("Reviews Negativos", ThumbsDown, summary.negatives)}
    </div>
  );
};
