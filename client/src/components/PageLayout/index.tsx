import Box from '@mui/material/Box';
import { ReactElement, ReactNode } from 'react';

import { Header } from 'components/Header';
import { Room, User } from 'types';

interface PageLayoutProps {
  children: ReactNode;
  room?: Room;
  users?: User[];
}

export function PageLayout({
  children,
  room,
  users,
}: PageLayoutProps): ReactElement {
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
        <Header room={room} users={users} />
      </Box>
      <Box sx={{ flexGrow: 1, marginTop: 10 }}>{children}</Box>
    </Box>
  );
}
