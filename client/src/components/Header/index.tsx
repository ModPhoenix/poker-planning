import IosShareIcon from '@mui/icons-material/IosShare';
import { Avatar, AvatarGroup, IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { AccountMenu } from 'components/AccountMenu';
import { User } from 'types';
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
  users?: User[];
}

export function Header({ users }: HeaderProps): ReactElement {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <List>
        <Link to="/">
          <Typography
            component="span"
            sx={{
              marginLeft: 1,
            }}
          >
            PokerPlanning
          </Typography>
        </Link>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Typography component="span">Room Name</Typography>
        <Divider orientation="vertical" variant="middle" flexItem />
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <IosShareIcon />
        </IconButton>
      </List>
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
    </Box>
  );
}
