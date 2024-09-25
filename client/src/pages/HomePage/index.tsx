import GitHubIcon from '@mui/icons-material/GitHub';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Box, styled } from '@mui/system';
import { ReactElement } from 'react';
import { toast } from 'react-hot-toast';
import { generatePath, useNavigate } from 'react-router-dom';

import { useCreateRoomMutation } from '@/api';
import { PageLayout } from '@/components';
import { useCopyRoomUrlToClipboard } from '@/hooks';
import { Path } from '@/settings';

const Section = styled('section')``;

const Divider = styled('div')(({ theme }) => ({
  width: '100%',
  height: '10px',
  background: theme.palette.primary.dark,
}));

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
      <Section>
        <Container
          sx={{
            pt: 8,
            pb: 8,
          }}
        >
          <Grid container>
            <Grid item md={8} container spacing={2}>
              <Grid item>
                <Typography variant="h2">
                  Planning poker tool for estimating in story points.
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="h6"
                  component="p"
                  style={{
                    fontWeight: 300,
                  }}
                >
                  PokerPlanning.org is an open-source tool for easy online
                  estimation in story points for teams around the world.
                  Planning poker, also called Scrum poker, is a consensus-based,
                  gamified technique for estimating, mostly used for timeboxing
                  in Agile principles.
                </Typography>
              </Grid>
              <Grid item container spacing={2}>
                <Grid item xs={12} sm={6} lg="auto">
                  <LoadingButton
                    onClick={onCreateRoom}
                    loading={loading}
                    loadingPosition="end"
                    variant="contained"
                    size="large"
                    disableElevation
                    fullWidth
                  >
                    Create a room
                  </LoadingButton>
                </Grid>
                <Grid item xs={12} sm={6} lg="auto">
                  <Button
                    href="https://github.com/ModPhoenix/poker-planning"
                    startIcon={<GitHubIcon />}
                    variant="outlined"
                    size="large"
                    fullWidth
                    LinkComponent="a"
                  >
                    View on Github
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              md={4}
              sx={{
                pl: 3,
              }}
            >
              <Box
                sx={{
                  minHeight: '100%',
                  width: '100%',
                  backgroundSize: '18px 18px',
                  backgroundImage:
                    'radial-gradient(rgb(74, 20, 140) 20%, transparent 20%)',
                  opacity: '0.3',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Section>
      <Divider />
    </PageLayout>
  );
}
