import {
  Box,
  Container,
  Link,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControlLabel,
} from '@mui/material';
import Footer from './Footer';
import { getData } from '../GrslData';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import { Link  as RouterLink} from 'react-router-dom';


export default function Teams() {
  const grslData = getData();
  let teams = Object.values(grslData.teams).sort((a,b ) => a.rank < b.rank ? -1 : 1);
  const [activeTeams, setActiveTeams] = useState(true);

  if (activeTeams) {
    teams = teams.filter(t => t.active);
  }

  const theme = useTheme();
  const short = useMediaQuery(theme.breakpoints.down('sm'));
  const medium = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Container
        sx={{
          pt: { xs: 10, sm: 14 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Box sx={{typography: 'h3', color: 'primary.main'}}>Teams</Box>   
        <TableContainer sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Table sx={{ maxWidth: { lg: 80, md: 100 }, mb: 2}}>
            <TableHead>
              <TableRow>
                <TableCell align="right" colSpan={10}>
                  <FormControlLabel 
                    label="Active Teams" 
                    control={
                      <Switch
                        checked={activeTeams} 
                        onChange={(e) => setActiveTeams(e.target.checked)}
                      />}
                   />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell></TableCell>
                <TableCell>Team</TableCell>
                <TableCell align="right">{short ? "Rating" : "Rating"}</TableCell>
                <TableCell align="right">{medium ? "W" : "Wins"}</TableCell>
                <TableCell align="right">{medium ? "D" : "Draws"}</TableCell>
                <TableCell align="right">{medium ? "L" : "Losses"}</TableCell>
                
              </TableRow>  
            </TableHead> 
            <TableBody>
              { teams.map(t => 
                <TableRow
                  key={t._id}
                >
                  <TableCell>{t.rank}</TableCell>
                  <TableCell sx={{ 
                    minWidth: { sm: 100,  md: 240 },
                    fontSize: '1.1rem'  
                  }}>
                    <Link to={'/team/' + t.code}
                      component={RouterLink}
                      sx={{ 
                        textDecoration: 'none', 
                        color: 'primary',
                        typography: 'h5',
                        fontFamily: { xs: 'monospace', sm: 'poppins'}
                        }}>
                      {short ? t.code : t.name}
                    </Link>
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: '1.4rem', fontWeight: 'medium' }}>{t.rating.toFixed(1)}</TableCell>
                  <TableCell align="right" sx={{ fontSize: '1.3rem'}}>{t.wins}</TableCell>
                  <TableCell align="right" sx={{ fontSize: '1.3rem'}}>{t.draws}</TableCell>
                  <TableCell align="right" sx={{ fontSize: '1.3rem'}}>{t.losses}</TableCell>
                  
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Footer />
    </>
  )
}