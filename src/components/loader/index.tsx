import React from "react";
import "./loader.styles.css";

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = () => (
  <div className="loader">Loading...</div>
);

export default Loader;
