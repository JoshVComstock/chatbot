import React from "react";
import { Link } from "react-router-dom";
import "../styles/exitButton.css";

export const ExitButton = ({ to = "/" }) => (
  <Link to={to} className="exit-button">
    Salir
  </Link>
);
