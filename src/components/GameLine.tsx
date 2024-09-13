import { Game } from '../GrslData';
import {
  Box,
  Link,
  Paper,
  Stack
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link as RouterLink } from 'react-router-dom';

interface GameLineProps {
  game: Game
}

export default function GameLine({ game} : GameLineProps) {
  const teamNameStyle = { 
    typography: 'h5', 
    m: 1
  };

  const gameTypes = { 
    r: ['Group', 'Group Stage'], 
    s: ['Semi', 'Semifinal'], 
    f: ['Final', 'Final'], 
    t: ['3rd Pl.','3rd Place'],
    '':['', 'Regular Season']
  };
  

  const theme = useTheme();
  const shortNames = useMediaQuery(theme.breakpoints.down('sm'));
  const mediumNames = useMediaQuery(theme.breakpoints.down('md'));

  const lgUpper = game.division.toUpperCase();
  const lgDesc = mediumNames ? "Div " + lgUpper : "Division " + lgUpper;

  let gameType;
  const gtIdx = mediumNames ? 0 : 1;
  if (game.tournament) {
    gameType = gameTypes[game.gameType][gtIdx];
  } else {
    gameType = gameTypes[''][gtIdx];
  }

  let htColor = 'primary';
  let atColor = 'primary';
  if (game.homeScore !== null && game.awayScore !== null) {
    if (game.homeScore > game.awayScore) {
      htColor = 'primary';
      atColor = 'gray';
    } else if (game.homeScore < game.awayScore) {
      htColor = 'gray';
      atColor = 'primary';
    }
  }
  
  return (
    <Box sx={{
      alignItems: 'spaceAround',
      display: 'flex', 
      flexDirection: 'row'}}>
      <Box sx={{flex: 1, display: 'flex', flexDirection: 'row'}}>
        <Stack sx={{ flex: 1 }}>
          <Box sx={{typography: 'subtitle1'}}>
            { mediumNames ? game.field.code : game.field.name}
          </Box>
          <Box sx={{typography: 'subtitle1'}}>
            {game.date.toLocaleTimeString(undefined, {hour12: true, timeStyle: "short"})}
          </Box>
        </Stack>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <Link component={RouterLink} 
            to={'/team/' + game.homeTeam.code} 
            sx={{ 
              textDecoration: 'none', 
              color: htColor,
              typography: 'h5',
              fontFamily: { xs: 'monospace', sm: 'poppins'}
              }}> 
            { shortNames ? game.homeTeam.code : game.homeTeam.name}
          </Link>
        </Box> 
      </Box>
      <Paper sx={{
          typography: 'h6', 
          m: 1, 
          display: 'flex', 
          flexDirection: 'row',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '48px'}}>
          { game.recorded ? 
            <>
              <Box sx={{ minWidth: '20px', textAlign: 'right'}}>{game.homeScore}</Box>
              <div style={{ 
                borderLeft: '1px solid #888', 
                height: '25px', 
                marginLeft: '4px', 
                marginRight: '4px'}}></div>
              <Box sx={{ minWidth: '20px', textAlign: 'left'}}>{game.awayScore}</Box>
            </> :
            "vs."
          }
      </Paper>
      <Box sx={{flex: 1, display: 'flex', flexDirection: 'row'}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <Link component={RouterLink} 
          to={'/team/' + game.awayTeam.code} 
          sx={{ 
            textDecoration: 'none', 
            color: atColor,
            typography: 'h5',
            fontFamily: { xs: 'monospace', sm: 'poppins'}
            }}> 
          { shortNames ? game.awayTeam.code : game.awayTeam.name}
        </Link>
        </Box>
        <Stack sx={{ flex: 1}}>
          <Box sx={{ textAlign: 'right', typography: 'subtitle1'}}>
            {lgDesc}
          </Box>
          <Box sx={{ textAlign: 'right', typography: 'subtitle2'}}>
            {gameType}
          </Box>

        </Stack>
      </Box>
    </Box>
  )

}
