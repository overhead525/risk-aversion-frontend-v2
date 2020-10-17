import React from "react";
import { RouteComponentProps } from "react-router-dom";

export interface AuthLayoutProps extends RouteComponentProps {
  isAuthed: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ isAuthed }) => {
  return <div>Auth Layout</div>;
};

export default AuthLayout;
