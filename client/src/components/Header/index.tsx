import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';

import { AccountMenu } from 'components/AccountMenu';
import { useAuth } from 'contexts';
import { useCopyRoomUrlToClipboard } from 'hooks';
import { Path } from 'settings';
import { Room, User } from 'types';
import { avatarNameToColor } from 'utils';

const List = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  borderRadius: theme.spacing(1),
  background: theme.palette.background.paper,
  padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
  '& hr': {
    marginLeft: theme.spacing(1.5),
    marginRight: theme.spacing(1.5),
  },
}));

interface HeaderProps {
  room?: Room;
  users?: User[];
}

export function Header({ room, users }: HeaderProps): ReactElement {
  const { user } = useAuth();
  const { copyRoomUrlToClipboard } = useCopyRoomUrlToClipboard();

  async function handleCopyRoomUrl() {
    if (room) {
      await copyRoomUrlToClipboard(room.id);
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <List>
        <Tooltip title="Click to go back to the home page">
          <Link href={Path.Home} underline="none">
            <Typography
              component="span"
              sx={{
                marginLeft: 1,
              }}
            >
              PokerPlanning{' '}
              <span role="img" aria-labelledby="logo">
                🃏
              </span>
            </Typography>
          </Link>
        </Tooltip>
        {room && (
          <>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Tooltip title="This is part of the unique room ID">
              <Typography component="span">{room.id.split('-')[0]}</Typography>
            </Tooltip>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Tooltip title="Copy room link">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                onClick={handleCopyRoomUrl}
              >
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </List>
      {user && (
        <List>
          {users && (
            <>
              <AvatarGroup max={4}>
                {users.map((user) => (
                  <Avatar
                    key={user.id}
                    alt={user.username}
                    {...avatarNameToColor(user.username)}
                  />
                ))}
              </AvatarGroup>
              <Divider orientation="vertical" variant="middle" flexItem />
            </>
          )}
          <AccountMenu />
        </List>
      )}
    </Box>
  );
}
