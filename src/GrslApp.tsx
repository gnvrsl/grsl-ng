import * as React from 'react';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './components/AppAppBar';
import getGRSLTheme from './getLPTheme';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './components/HomePage';
import Standings from './components/Standings';
import Schedule from './components/Schedule';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "standings",
    element: <Standings />
  },
  {
    path: "schedule",
    element: <Schedule />
  }
])


export default function GrslApp() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const GRSLTheme = createTheme(getGRSLTheme(mode));
  //const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={GRSLTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} router={router} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
