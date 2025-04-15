import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './components/AppAppBar';
import BoardBios from './components/BoardBios';
import getGRSLTheme from './getGRSLTheme';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useLoaderData
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
import { getData, getPlayerData, LeagueData } from './GrslData';
import Goals from './components/Goals';
import { useState } from 'react';
import AlertBanner from './components/AlertBanner';
import { alertMessageText } from './AlertMessageText';


const GoalsRedirect = () => {
  const grslData = useLoaderData() as LeagueData;
  const seasons = Object.values(grslData.seasons);
  const defaultSeasonCode = seasons[seasons.length - 1].code;

  return <Navigate to={`/goals/${defaultSeasonCode}`} />
}

const StandingsRedirect = () => {
   const grslData = useLoaderData() as LeagueData;
   const defaultSeasonCode = grslData.seasons2[grslData.seasons2.length - 1].code;

   return <Navigate to={`/standings/${defaultSeasonCode}`} />
}

// Partial load of data for pages that do not need player data
let teamsGamesLoaded = false;
const LoadTeamsGames = async () => {
  let grslData = null;
  if (! teamsGamesLoaded) {
    const response = await fetch('/json/teamsGames.json');
    const teamsGames =  await response.json();
    grslData = getData(teamsGames);
    teamsGamesLoaded = true;
  } else {
    grslData = getData(null); 
  } 
  
  return grslData;
}

// This is a separate function because it contains more data that the teamsGames data
let playersLoaded = false;
const LoadPlayers = async () => {
  let grslData = await LoadTeamsGames();
  if (playersLoaded) {
    return grslData;
  }

  const response = await fetch('/json/playerData.json');
  const players = await response.json();
  grslData = getPlayerData(players);
  playersLoaded = true;

  return grslData;
}


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />
  },
  { 
    path: "about",
    element: <Info />,
    errorElement: <ErrorPage />
  },
  {
    path: "board",
    element: <BoardBios />,
    errorElement: <ErrorPage />
  },
  {
    path: "documents",
    element: <Documents />,
    errorElement: <ErrorPage />
  },
  {
    path: "goals",
    loader: LoadTeamsGames,
    element: <GoalsRedirect />,
    errorElement: <ErrorPage />
  },
  {
    path: "goals/:code",
    loader: LoadPlayers,
    element: <Goals />,
    errorElement: <ErrorPage />
  },
  {
    path: "standings",
    loader: LoadTeamsGames,
    element: <StandingsRedirect />,
    errorElement: <ErrorPage />
  },
  {
    path: "standings/:code",
    loader: LoadTeamsGames,
    element: <Standings />,
    errorElement: <ErrorPage />
  },
  {
    path: "schedule",
    element: <Schedule />,
    loader: LoadTeamsGames,
    errorElement: <ErrorPage />
  },
  {
    path: "teams",
    loader: LoadTeamsGames,
    element: <Teams />,
    errorElement: <ErrorPage />
  },
  {
    path: "team/:code",
    loader: LoadPlayers,
    element: <TeamRedirect />,
  },
  {
    path: "team/:code/:season",
    loader: LoadPlayers,
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
  
  const [alertMessage, _] = useState(alertMessageText);

  const toggleColorMode = () => {
    //setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={GRSLTheme}>
      <CssBaseline />
      <AlertBanner message={alertMessage} />
      <AppAppBar 
        mode={mode} 
        toggleColorMode={toggleColorMode} 
        router={router} 
        displayAlertBanner={alertMessage !== ""}
      />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
