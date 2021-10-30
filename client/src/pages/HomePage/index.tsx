import StarsIcon from '@mui/icons-material/Stars';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';
import { toast } from 'react-hot-toast';
import { generatePath, useNavigate } from 'react-router-dom';

import { useCreateRoomMutation } from 'api';
import { PageLayout } from 'components';
import { useCopyRoomUrlToClipboard } from 'hooks';
import { Path } from 'settings';

export function HomePage(): ReactElement {
  const navigate = useNavigate();
  const { copyRoomUrlToClipboard } = useCopyRoomUrlToClipboard();

  const [createRoomMutation, { loading }] = useCreateRoomMutation({
    onCompleted: (data) => {
      navigate(generatePath(Path.Room, { roomId: data.createRoom.id }));
      copyRoomUrlToClipboard(data.createRoom.id);
    },
    onError: (error) => {
      toast.error(`Create room: ${error.message}`);
    },
  });

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
            endIcon={<StarsIcon />}
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
