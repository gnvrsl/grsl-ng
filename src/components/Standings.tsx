import { 
  Box,
  Container, 
  IconButton,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import {
  ArrowLeft,
  ArrowRight
} from '@mui/icons-material';
import Footer from './Footer';
import { getData } from '../GrslData';
import { useState } from 'react';

export default function Standings() {
  const grslData = getData();
  const [activeSeasonIdx, setActiveSeason] = useState(33);
  const activeSeason = grslData.seasons[activeSeasonIdx];
  let activeStandings = activeSeason.standings;

  function prevSeason() {
    setActiveSeason(activeSeasonIdx - 1);
  }

  function nextSeason() {
    setActiveSeason(activeSeasonIdx + 1);
  }

  //const bgOriginal = (theme) => ({
  //  backgroundImage:
  //  theme.palette.mode === 'light'
  //    ? 'linear-gradient(180deg, #CEF5C4, #FFF)'
  //    : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
  //  backgroundSize: '100% 20%',
  //  backgroundRepeat: 'no-repeat',
  //})

  //const leagues = ['a', 'b', 'c'];
  const leagueNames: any = {
    a: 'A League',
    b: 'B League',
    c: 'C League'
  }  

  return (
    <>
      <Box
        id="hero"
        sx={{ width: '100%' }}
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
          }}
        >
          
          <h1>
            <IconButton onClick={prevSeason}><ArrowLeft /></IconButton>
            {activeSeason.name} Standings
            <IconButton onClick={nextSeason}><ArrowRight /></IconButton>
          </h1>
          { Object.entries(activeStandings).map(([division, lstanding]) => {
            if (lstanding.length) {
              return (
                <TableContainer key={division} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <Table sx={{ maxWidth: 80, mb: 2 }}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" colSpan={8} sx={{typography: 'subtitle2'}}>
                          {leagueNames[division]}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Team</TableCell>
                        <TableCell align="right">Wins</TableCell>
                        <TableCell align="right">Draws</TableCell>
                        <TableCell align="right">Losses</TableCell>
                        <TableCell align="right">Points</TableCell>
                        <TableCell align="right">GF</TableCell>
                        <TableCell align="right">GA</TableCell>
                        <TableCell align="right">GD</TableCell>  
                      </TableRow>  
                    </TableHead> 
                    <TableBody>
                      { lstanding.map(s => 
                        <TableRow
                          key={s.team.name}
                        >
                          <TableCell sx={{ minWidth: 200 }}>{s.team.name}</TableCell>
                          <TableCell align="right">{s.wins}</TableCell>
                          <TableCell align="right">{s.draws}</TableCell>
                          <TableCell align="right">{s.losses}</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 'medium' }}>{s.points}</TableCell>
                          <TableCell align="right">{s.goalsFor}</TableCell>
                          <TableCell align="right">{s.goalsAgainst}</TableCell>
                          <TableCell align="right">{s.goalDifference}</TableCell>
                        </TableRow>
                      )}
                      
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            }
          )}         
        </Container>
      </Box>
      <Footer />
    </>
  )
}