import { ReactElement, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

export function Card({ children }: CardProps): ReactElement {
  return <div>{children}</div>;
}
