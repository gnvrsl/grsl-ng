import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './components/AppAppBar';
import getGRSLTheme from './getGRSLTheme';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";
import Documents from './components/Documents';
import HomePage from './components/HomePage';
import Info from './components/Info';
import MarkdownPage, { loadMarkdownPage } from './components/MarkdownPage';
import Standings from './components/Standings';
import Schedule from './components/Schedule';
import Teams from './components/Teams';
import TeamPage, { TeamRedirect } from './components/TeamPage';
import ErrorPage from './components/ErrorPage';
import { getData } from './GrslData';

const StandingsRedirect = () => {
   const grslData = getData();
   const defaultSeasonCode = grslData.seasons2[grslData.seasons2.length - 1].code;

   return <Navigate to={`/standings/${defaultSeasonCode}`} />
}



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
    element: <StandingsRedirect />
  },
  {
    path: "standings/:code",
    element: <Standings />
  },
  {
    path: "schedule",
    element: <Schedule />,
    errorElement: <ErrorPage />
  },
  {
    path: "teams",
    element: <Teams />
  },
  {
    path: "team/:code",
    element: <TeamRedirect />
  },
  {
    path: "team/:code/:season",
    element: <TeamPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "page/:page",
    loader: loadMarkdownPage,
    element: <MarkdownPage />
  }
])


export default function GrslApp() {
  const mode = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light';
  const GRSLTheme = createTheme(getGRSLTheme(mode));
  //const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    //setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={GRSLTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} router={router} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
