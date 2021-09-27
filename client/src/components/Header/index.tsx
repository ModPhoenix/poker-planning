import IosShareIcon from '@mui/icons-material/IosShare';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import { ReactElement } from 'react';

const List = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  borderRadius: theme.spacing(1),
  background: theme.palette.background.paper,
  '& svg': {
    margin: theme.spacing(1.5),
  },
  '& hr': {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
}));

export function Header(): ReactElement {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <List>
        <Typography
          component="span"
          variant="h6"
          sx={{ marginLeft: 2, marginRight: 2 }}
        >
          Poker Planning
        </Typography>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Typography component="span" sx={{ marginLeft: 2, marginRight: 2 }}>
          Room Name
        </Typography>
        <Divider orientation="vertical" variant="middle" flexItem />
        <IosShareIcon />
        <SettingsIcon />
      </List>
      <List>
        <Avatar sx={{ width: 24, height: 24, m: 1.5 }}>U</Avatar>
      </List>
    </Box>
  );
}
