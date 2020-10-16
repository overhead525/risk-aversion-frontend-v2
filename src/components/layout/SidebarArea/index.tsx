import React from "react";

export interface SidebarAreaProps {}

const SidebarArea: React.FC<SidebarAreaProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default SidebarArea;
