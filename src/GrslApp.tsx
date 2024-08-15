import * as React from 'react';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './components/AppAppBar';
import getLPTheme from './getLPTheme';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './components/HomePage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  }
])


export default function GrslApp() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const LPtheme = createTheme(getLPTheme(mode));

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
