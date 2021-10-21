import Box from '@mui/material/Box';
import { ReactElement, ReactNode } from 'react';

import { Header } from 'components/Header';
import { User } from 'types';

interface PageLayoutProps {
  children: ReactNode;
  users?: User[];
}

export function PageLayout({ children, users }: PageLayoutProps): ReactElement {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.default',
        minHeight: '100vh',
      }}
    >
      <Box sx={{ position: 'absolute', top: 10, left: 10, right: 10 }}>
        <Header users={users} />
      </Box>
      <Box sx={{ flexGrow: 1, marginTop: 10 }}>{children}</Box>
    </Box>
  );
}
