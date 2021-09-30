import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';

import { useCreateRoomMutation } from 'api';
import { PageLayout } from 'components';

export function HomePage(): ReactElement {
  const [createRoomMutation, { loading, data, error }] =
    useCreateRoomMutation();

  console.log(`data`, data);
  console.log(`error`, error);

  function onCreateRoom() {
    createRoomMutation();
  }

  return (
    <PageLayout>
      <Container maxWidth="md" sx={{ marginTop: 30 }}>
        <Typography component="h1" variant="h4" gutterBottom>
          Planning poker tool for estimating in story points in scrum poker
          game.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 6 }}>
          <LoadingButton
            onClick={onCreateRoom}
            endIcon={<SendIcon />}
            loading={loading}
            loadingPosition="end"
            variant="outlined"
            size="large"
          >
            Create room
          </LoadingButton>
        </Box>
      </Container>
    </PageLayout>
  );
}
