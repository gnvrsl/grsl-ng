import { 
  Box,
  Container, 
  IconButton,
  Link,
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
import { Link as RouterLink } from 'react-router-dom';

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
    a: 'Division A',
    b: 'Division B',
    c: 'Division C'
  }  

  return (
    <>
      <Container
        sx={{
          pt: { xs: 10, sm: 14 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Box sx={{typography: 'h3', color: 'primary.main'}}>Standings</Box>
        <Box sx={{ 
          width: '100%',
          display: 'flex', 
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          typography: 'h5',
          }}>
          <IconButton onClick={prevSeason}><ArrowLeft /></IconButton>
          <Box sx={{ textAlign: 'center' }}>
            {activeSeason.name}
          </Box>
          <IconButton onClick={nextSeason}><ArrowRight /></IconButton>
        </Box>
        { Object.entries(activeStandings).map(([division, lstanding]) => {
          if (lstanding.length) {
            return (
              <TableContainer key={division} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Table sx={{ maxWidth: { lg: 80, md: 100 }, mb: 2}}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" colSpan={10} sx={{typography: 'subtitle2'}}>
                        {leagueNames[division]}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell></TableCell>
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
                        <TableCell>{s.rank}</TableCell>
                        <TableCell sx={{ 
                          minWidth: { sm: 100,  md: 200 },
                          fontSize: '1.1rem'  
                        }}>
                          <Link component={RouterLink} 
                            to={'/team/' + s.team.code} 
                            sx={{ 
                              textDecoration: 'none', 
                              typography: 'h5',
                              color: 'primary',
                              fontFamily: { xs: 'monospace', sm: 'poppins'}
                            }}>
                          {short ? s.team.code : s.team.name}
                          </Link>
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
      <Footer />
    </>
  )
}