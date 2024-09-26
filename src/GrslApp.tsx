import * as React from 'react';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './components/AppAppBar';
import getGRSLTheme from './getGRSLTheme';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Documents from './components/Documents';
import HomePage from './components/HomePage';
import Info from './components/Info';
import Standings from './components/Standings';
import Schedule from './components/Schedule';
import Teams from './components/Teams';
import TeamPage from './components/TeamPage';
import ErrorPage from './components/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />
  },
  { 
    path: "about",
    element: <Info />
  },
  {
    path: "documents",
    element: <Documents />
  },
  {
    path: "standings",
    element: <Standings />
  },
  {
    path: "schedule",
    element: <Schedule />
  },
  {
    path: "teams",
    element: <Teams />
  },
  {
    path: "team/:code",
    element: <TeamPage />,
    errorElement: <ErrorPage />
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
