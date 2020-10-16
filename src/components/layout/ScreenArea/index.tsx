import React from "react";

export interface ScreenAreaProps {}

const ScreenArea: React.FC<ScreenAreaProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default ScreenArea;
