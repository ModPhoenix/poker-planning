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
    <>
      <Header
        room={room}
        users={users}
        sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}
      />
      <Box sx={{ flexGrow: 1, marginTop: 10 }} component="main">
        {children}
      </Box>
    </>
  );
}
