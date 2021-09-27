import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';

import { PageLayout } from 'components';

export function HomePage(): ReactElement {
  return (
    <PageLayout>
      <Container maxWidth="md" sx={{ marginTop: 30 }}>
        <Typography component="h1" variant="h4" gutterBottom>
          Planning poker tool for estimating in story points in scrum poker
          game.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 6 }}>
          <Button variant="outlined" size="large">
            Create room
          </Button>
        </Box>
      </Container>
    </PageLayout>
  );
}
