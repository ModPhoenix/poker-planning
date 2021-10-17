import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { PageLayout } from 'components';

export function NotFoundPage(): ReactElement {
  return (
    <PageLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexGrow: 1,
        }}
      >
        <Typography component="h1" variant="h3">
          Page Not Found
        </Typography>
        <Link to="/">
          <Typography component="span" variant="body1">
            Go to home
          </Typography>
        </Link>
      </Box>
    </PageLayout>
  );
}
