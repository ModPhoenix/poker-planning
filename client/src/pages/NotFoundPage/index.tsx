import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ReactElement } from 'react';

export function NotFoundPage(): ReactElement {

  return (
        <Box
	      sx={{
	        display: 'flex',
	        flexDirection: 'column',
	        alignItems: 'center',
	      }}
	    >
      		<Typography component="h1">Page Not Found</Typography>
	    	</Box>
      );
}
