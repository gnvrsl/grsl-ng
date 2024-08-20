import { 
  alpha,
  Box,
  Container, 
  Paper,
  Stack,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import * as React from 'react';
import Footer from './Footer';
import { useLoaderData } from 'react-router-dom';
import { getData } from '../GrslData';

export default function Standings() {
  const grslData = getData();
  let activeStandings = grslData.seasons[33].standings;

  const leagues = ['a', 'b', 'c'];
  const leagueNames: any = {
    a: 'A League',
    b: 'B League',
    c: 'C League'
  }  

  return (
    <>
      <Box
        id="hero"
        sx={(theme) => ({
          width: '100%',
          backgroundImage:
            theme.palette.mode === 'light'
              ? 'linear-gradient(180deg, #CEF5C4, #FFF)'
              : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
          backgroundSize: '100% 20%',
          backgroundRepeat: 'no-repeat',
        })}
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
          { Object.entries(activeStandings).map(([division, lstanding]) => {
            if (lstanding.length) {
              return (
                <TableContainer key={division}>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" colSpan={8}>
                        <Typography sx={{ fontWeight: 'bold', mt: 2 }}>{leagueNames[division]}</Typography>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Team</TableCell>
                      <TableCell>Wins</TableCell>
                      <TableCell>Draws</TableCell>
                      <TableCell>Losses</TableCell>
                      <TableCell>Points</TableCell>
                      <TableCell>GF</TableCell>
                      <TableCell>GA</TableCell>
                      <TableCell>GD</TableCell>  
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
                        <TableCell align="right" sx={{ fontWeight: 'bold' }}>{s.points}</TableCell>
                        <TableCell align="right">{s.goalsFor}</TableCell>
                        <TableCell align="right">{s.goalsAgainst}</TableCell>
                        <TableCell align="right">{s.goalDifference}</TableCell>
                      </TableRow>
                    )}
                    
                  </TableBody>
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