import React, { useState, useEffect } from "react";
import "../styles/dropdown.css";

const API_URL = "http://localhost:8000/restaurants";

export const Dropdown = ({ onSelect }) => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch restaurants");
      const data = await response.json();

      const formatted = data.map((r) => ({
        id: r._id,
        label: r.nombreDelRestaurante || "Nombre no disponible",
      }));

      setItems(formatted);
    } catch (error) {
      alert("Error loading restaurants");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    setOpen(false);
    if (onSelect) onSelect(item);
  };

  if (loading) {
    return <div className="loading-text">Loading...</div>;
  }

  return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={() => setOpen(!open)}>
        {selectedItem ? selectedItem.label : "Selecciona un restaurante"}
      </button>

      {open && (
        <ul className="dropdown-list">
          {items.map((item) => (
            <li
              key={item.id}
              className="dropdown-item"
              onClick={() => handleSelect(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleSelect(item);
              }}
              tabIndex={0}
              role="option"
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
