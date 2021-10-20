import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const Card = styled(Button)<ButtonProps>({
  height: '80px',
  minWidth: '52px',
  fontSize: 20,
  padding: '24px 12px',
  border: '2px solid',
  lineHeight: 1.5,
});
