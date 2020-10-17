import React from "react";
import { parseClassName } from "../../../helpers/strings";

export interface HeaderAreaProps {
  className?: string;
}

const HeaderArea: React.FC<HeaderAreaProps> = (
  { children, className },
  props
) => {
  return (
    <div {...props} className={className ? parseClassName(className) : ""}>
      {children}
    </div>
  );
};

export default HeaderArea;
