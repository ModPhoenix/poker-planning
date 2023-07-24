import { ApolloProvider } from '@apollo/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router } from 'react-router-dom';

import { client } from 'api';
import { ConfirmationDialogProvider } from 'components';
import { AuthProvider } from 'contexts';
import { theme } from 'styles';

import { App } from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster />
      <ApolloProvider client={client}>
        <Router>
          <AuthProvider>
            <ConfirmationDialogProvider>
              <App />
            </ConfirmationDialogProvider>
          </AuthProvider>
        </Router>
      </ApolloProvider>
    </ThemeProvider>
  </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
