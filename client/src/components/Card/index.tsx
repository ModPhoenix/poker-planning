import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { ReactElement, ReactNode } from 'react';

const CardButton = styled(Button)<ButtonProps>({
  height: '80px',
  minWidth: '52px',
  fontSize: 20,
  padding: '24px 12px',
  border: '2px solid',
  lineHeight: 1.5,
});

interface CardProps {
  children: ReactNode;
  onClick?(): void;
}

export function Card({ children, onClick }: CardProps): ReactElement {
  return <CardButton onClick={onClick}>{children}</CardButton>;
}
