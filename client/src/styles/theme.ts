import { grey } from '@mui/material/colors';
import { LinkProps } from '@mui/material/Link';
import { createTheme } from '@mui/material/styles';

import { LinkBehavior } from 'components/LinkBehavior';

export const theme = createTheme({
  palette: {
    background: {
      default: grey[100],
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  },
});
