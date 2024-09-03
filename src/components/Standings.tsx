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
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

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

  const theme = useTheme();
  const short = useMediaQuery(theme.breakpoints.down('sm'));
  const medium = useMediaQuery(theme.breakpoints.down('md'));

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
                  <Table sx={{ maxWidth: { lg: 80, md: 100 }, mb: 2}}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" colSpan={8} sx={{typography: 'subtitle2'}}>
                          {leagueNames[division]}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Team</TableCell>
                        <TableCell align="right">{medium ? "W" : "Wins"}</TableCell>
                        <TableCell align="right">{medium ? "D" : "Draws"}</TableCell>
                        <TableCell align="right">{medium ? "L" : "Losses"}</TableCell>
                        <TableCell align="right">{short ? "P" : "Points"}</TableCell>
                        { short ? "" :
                          <>
                          <TableCell align="right">GF</TableCell>
                          <TableCell align="right">GA</TableCell>
                          </> 
                        }
                        <TableCell align="right">GD</TableCell>  
                      </TableRow>  
                    </TableHead> 
                    <TableBody>
                      { lstanding.map(s => 
                        <TableRow
                          key={s.team.name}
                        >
                          <TableCell sx={{ 
                            minWidth: { sm: 100,  md: 200 },
                            fontSize: '1.1rem'  
                          }}>
                            {short ? s.team.code : s.team.name}
                          </TableCell>
                          <TableCell align="right" sx={{ fontSize: '1.3rem'}}>{s.wins}</TableCell>
                          <TableCell align="right" sx={{ fontSize: '1.3rem'}}>{s.draws}</TableCell>
                          <TableCell align="right" sx={{ fontSize: '1.3rem'}}>{s.losses}</TableCell>
                          <TableCell align="right" sx={{ fontSize: '1.6rem', fontWeight: 'medium' }}>{s.points}</TableCell>
                          { short ? "": 
                            <>
                              <TableCell align="right" sx={{ fontSize: '1.3rem'}}>{s.goalsFor}</TableCell>
                              <TableCell align="right" sx={{ fontSize: '1.3rem'}}>{s.goalsAgainst}</TableCell>
                            </>
                          }
                          <TableCell align="right" sx={{ fontSize: '1.3rem'}}>{s.goalDifference}</TableCell>
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