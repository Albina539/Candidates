// src/__mocks__/react-router-dom.ts
import React from "react";

export const Link = ({ children, to, ...props }: any) => (
  <a href={to} {...props} data-testid="mock-link">
    {children}
  </a>
);

export const useNavigate = () => jest.fn();
