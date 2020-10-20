import React from "react";
import { parseClassName } from "../../../helpers/strings";

export interface ScreenAreaProps {
  className?: string;
}

const ScreenArea: React.FC<ScreenAreaProps> = (
  { children, className },
  props
) => {
  return (
    <div {...props} className={className ? parseClassName(className) : ""}>
      {children}
    </div>
  );
};

export default ScreenArea;
