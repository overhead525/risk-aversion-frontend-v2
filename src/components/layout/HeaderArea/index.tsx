import React from "react";

export interface HeaderAreaProps {}

const HeaderArea: React.FC<HeaderAreaProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default HeaderArea;
