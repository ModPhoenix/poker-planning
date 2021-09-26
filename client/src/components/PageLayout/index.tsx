import Box from '@mui/material/Box';
import { ReactElement, ReactNode } from 'react';

import { Header } from 'components/Header';

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps): ReactElement {
  return (
    <Box
      sx={{ position: 'relative', display: 'flex', flexDirection: 'column' }}
    >
      <Box sx={{ position: 'absolute', top: 10, left: 10, right: 10 }}>
        <Header />
      </Box>
      <Box sx={{ marginTop: 10 }}>{children}</Box>
    </Box>
  );
}
