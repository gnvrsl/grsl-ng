import { Game } from '../GrslData';
import {
  Box,
  Paper,
  Stack
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface GameLineProps {
  game: Game
}

export default function GameLine({ game} : GameLineProps) {
  const teamNameStyle = { typography: 'h5', m: 1};

  const gameTypes = { r: 'Group Stage', s: 'Semifinal', f: 'Final', t: '3rd Place', '': 'Regular Season' };
  const lgDesc = game.division.toUpperCase() + ' League';
  let gameType = 'Regular Season';
  if (game.tournament) {
    gameType = gameTypes[game.gameType];
  }

  const theme = useTheme();
  const shortNames = useMediaQuery(theme.breakpoints.down('sm'));
  const mediumNames = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Box sx={{
      alignItems: 'spaceAround',
      display: 'flex', 
      flexDirection: 'row'}}>
      { game.recorded ? (
        <>
          <Box sx={{flex: 1, display: 'flex', flexDirection: 'row'}}>
            <Stack sx={{ flex: 1 }}>
              <Box sx={{ fontWeight: '500' }}>
                {game.date.getMonth() + 1}/{game.date.getDate()}
              </Box>
              <Box sx={{typography: 'subtitle1'}}>
                {game.date.getHours()}:{game.date.getMinutes()}{ game.date.getHours() < 12 ? 'am' : 'pm'}
              </Box>
            </Stack>
            <Box sx={teamNameStyle}>
              { shortNames ? game.homeTeam.code : game.homeTeam.name}
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
              <Box sx={{ minWidth: '20px', textAlign: 'right'}}>{game.homeScore}</Box>
              <div style={{ 
                borderLeft: '1px solid #888', 
                height: '25px', 
                marginLeft: '4px', 
                marginRight: '4px'}}></div>
              <Box sx={{ minWidth: '20px', textAlign: 'left'}}>{game.awayScore}</Box>
          </Paper>
          <Box sx={{flex: 1, display: 'flex', flexDirection: 'row'}}>
            <Box sx={teamNameStyle}>
              { shortNames ? game.awayTeam.code : game.awayTeam.name}
            </Box>
            <Stack sx={{ flex: 1}}>
              <Box sx={{ textAlign: 'right', typography: 'subtitle1'}}>
                { shortNames ? game.field.code : game.field.name}
              </Box>
              <Box sx={{ textAlign: 'right', typography: 'subtitle2'}}>
                {lgDesc} { mediumNames ? "" : gameType}
              </Box>

            </Stack>

          </Box>
        </>
      ) : (
        <>
          <Box>
            {game.homeTeam.name}
          </Box>  
          <Box>
            {game.awayTeam.name}
          </Box>
        </>
      )}
    </Box>
  )

}
