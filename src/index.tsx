import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { StyledEngineProvider, createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@emotion/react'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './router'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import store from './store'
import { SnackbarProvider } from 'notistack'
const rootElement = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(rootElement)
const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#1C2833',
      dark: '#002884',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#3E3E3E',
      dark: '#ba000d',
      contrastText: '#000'
    },
    success: {
      light: '#ba000d',
      main: '#638BB3',
      dark: '#ba000d',
      contrastText: '#fff'
    }
  },
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement
      }
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement
      }
    },
    MuiDialog: {
      defaultProps: {
        container: rootElement
      }
    },
    MuiModal: {
      defaultProps: {
        container: rootElement
      }
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#d3d3d3'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#527AC2'
          }
        }
      }
    }
  }
})

root.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <ErrorBoundary fallback={<div>fallback render</div>}>
      <QueryClientProvider client={queryClient}>
        <StyledEngineProvider injectFirst>
          <Provider store={store}>
            <SnackbarProvider anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
              <App />
            </SnackbarProvider>
          </Provider>
        </StyledEngineProvider>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </ErrorBoundary>
  </ThemeProvider>
  // </React.StrictMode>
)
