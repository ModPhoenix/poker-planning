import { LinkProps } from '@mui/material/Link';
import { createTheme } from '@mui/material/styles';

import { LinkBehavior } from 'components/LinkBehavior';

export const theme = createTheme({
  typography: {
    h2: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
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
