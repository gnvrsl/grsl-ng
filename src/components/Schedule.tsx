import * as React from 'react';
import { getData } from '../GrslData';
import {
  Box,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { useState } from 'react';
import GameLine from './GameLine';
import Footer from './Footer';


export default function Schedule() {
  const grslData = getData();
  const [division, setDivision] = useState('');
  const [year, setYear] = useState((new Date()).getFullYear().toString());

  const seasons = Object.values(grslData.seasons).filter(s => s.end.getFullYear().toString() == year);
  let games = seasons.map(s => s.games).reduce((prev, cur) => prev.concat(cur));
  games.sort((g1, g2) => g1.date < g2.date ? -1 : 1);

  if (division) {
    games = games.filter((g) => g.division == division);
  }

  const handleDivChange = (event: SelectChangeEvent) => {
    setDivision(event.target.value);
  }

  const handleYearChange = (event: SelectChangeEvent) => {
    setYear(event.target.value);
  }

  let previousPd = 0;

  return(
    <>
      <Box
        id="hero"
        sx={{ width: '100%' }}
      >
        <Container
          sx={{
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row'}}>
            <FormControl variant="standard" sx={{m: 1, minWidth: 80}}>
              <InputLabel id="year-label">Year</InputLabel>  
              <Select
                labelId="year-label"
                id="year-select"
                value={year}
                onChange={handleYearChange}
              >
                { grslData.years.map(y => 
                  <MenuItem key={y} value={y}>{y}</MenuItem>
                )}
              </Select>
            </FormControl> 
            <FormControl variant="standard" sx={{m: 1, minWidth: 80}}>
              <InputLabel id="div-label">Division</InputLabel>  
              <Select
                labelId="div-label"
                id="div-select"
                value={division}
                onChange={handleDivChange}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="a">A</MenuItem>
                <MenuItem value="b">B</MenuItem>
                <MenuItem value="c">C</MenuItem>
              </Select>
            </FormControl> 
          </Box>
          
          { games.map(game => {
            const printDate = game.playDate._id != previousPd;
            if (printDate) {
              previousPd = game.playDate._id;
            }
            if (game) {
              return (
              <React.Fragment key={game._id}>
                { printDate ? 
                  <Box sx={{typography: 'h5', mt: 3}}>
                    {game.date.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric"})}
                  </Box> :
                  <Divider />
                }
                <GameLine game={game}></GameLine>
              </React.Fragment>
            )
            }
            return "undefined game"
          })}
        </Container>
      </Box>
      <Footer />
    </>
  )
}