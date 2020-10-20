import React from "react";
import { RouteComponentProps } from "react-router-dom";

import { AuthForm } from "../../features/auth/AuthForm";

export interface AuthLayoutProps extends RouteComponentProps {}

const AuthLayout: React.FC<AuthLayoutProps> = () => {
  return (
    <div>
      <AuthForm />
    </div>
  );
};

export default AuthLayout;
