import React from "react";
import { parseClassName } from "../../../helpers/strings";

export interface SidebarAreaProps {
  className?: string;
}

const SidebarArea: React.FC<SidebarAreaProps> = (
  { children, className },
  props
) => {
  return (
    <div {...props} className={className ? parseClassName(className) : ""}>
      {children}
    </div>
  );
};

export default SidebarArea;
