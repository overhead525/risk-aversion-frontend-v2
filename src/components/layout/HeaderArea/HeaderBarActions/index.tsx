import React from "react";
import { HeaderGlobalBar, HeaderGlobalAction } from "carbon-components-react";
import { Search20, Notification20, AppSwitcher20 } from "@carbon/icons-react";
import { action } from "@storybook/addon-actions";

export const HeaderBarActions: React.FC = () => {
  return (
    <HeaderGlobalBar>
      <HeaderGlobalAction aria-label="Search" onClick={action("search click")}>
        <Search20 />
      </HeaderGlobalAction>
      <HeaderGlobalAction
        aria-label="Notifications"
        onClick={action("notification click")}
      >
        <Notification20 />
      </HeaderGlobalAction>
      <HeaderGlobalAction
        aria-label="App Switcher"
        onClick={action("app-switcher click")}
      >
        <AppSwitcher20 />
      </HeaderGlobalAction>
    </HeaderGlobalBar>
  );
};
