import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Footer from './Footer';
import { getData } from '../GrslData';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';


export default function Teams() {
  const grslData = getData();
  let teams = Object.values(grslData.teams).sort((a,b ) => a.rank < b.rank ? -1 : 1);
  const [activeTeams, setActiveTeams] = useState("1");

  if (activeTeams == "1") {
    teams = teams.filter(t => t.active);
  }

  const theme = useTheme();
  const short = useMediaQuery(theme.breakpoints.down('sm'));
  const medium = useMediaQuery(theme.breakpoints.down('md'));

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
          pt: { xs: 10, sm: 14 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'row',
          alignItems: 'space-between',
          width: '100%',
          typography: 'h5',
          }}>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            typography: 'h5',
            }}>
            Team Rankings
          </Box>
          <FormControl variant="standard" sx={{m: 1, minWidth: 80}}>
            <InputLabel id="active-label">Active</InputLabel>  
            <Select
              labelId="active-label"
              id="active-select"
              value={activeTeams}
              onChange={(e) => setActiveTeams(e.target.value)}
            >
              <MenuItem value="1">Active Teams</MenuItem>
              <MenuItem value="0">All Teams</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TableContainer sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Table sx={{ maxWidth: { lg: 80, md: 100 }, mb: 2}}>
            <TableHead>

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
                    minWidth: { sm: 100,  md: 200 },
                    fontSize: '1.1rem'  
                  }}>
                    {short ? t.code : t.name}
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
    </Box>
    <Footer />
    </>
  )
}