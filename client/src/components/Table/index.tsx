import Box from '@mui/material/Box';
import { ReactElement } from 'react';

export function Table(): ReactElement {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '300px',
        height: '150px',
        backgroundColor: 'primary.main',
        borderRadius: 8,
        color: 'common.white',
      }}
    >
      Table
    </Box>
  );
}
