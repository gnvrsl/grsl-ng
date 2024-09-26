import * as React from 'react';
import { getData, Game } from '../GrslData';
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
  const [year, setYear] = useState("This Week");
  const [team, setTeam] = useState('');

  let searchYear = year;
  if (year == "This Week") {
    searchYear = new Date().getFullYear().toString();
  }

  const seasons = Object.values(grslData.seasons).filter(s => s.end.getFullYear().toString() == searchYear);  
  let games = seasons.map(s => s.games).reduce((prev, cur) => prev.concat(cur));
  games.sort((g1, g2) => g1.date < g2.date ? -1 : 1);

  if (division) {
    games = games.filter((g) => g.division == division);
  }

  const yearTeams = games.map(g => g.homeTeam).concat(games.map(g => g.awayTeam));
  let teamOptions = [...new Map(yearTeams.map(item => [item._id, item])).values()];
  teamOptions.sort((t1, t2) => t1.name < t2.name ? -1 : 1);

  const nextSunday = new Date();
  nextSunday.setDate(nextSunday.getDate() + (7 - nextSunday.getDay()));

  if (year == "This Week") {
    // filter games to match most recent play date from grslData.playDates and next play date from grslData.playDates

    const today = new Date();

    let previousPlayDateGames: Game[] = [];
    const previousPlayDates = Object.values(grslData.playDates).filter(pd => pd.date < today);
    if (previousPlayDates.length > 0) {
      previousPlayDates.sort((pd1, pd2) => pd1.date < pd2.date ? 1 : -1);
      const previousPlayDate = previousPlayDates[0];
      previousPlayDateGames = games.filter(g => g.playDate._id == previousPlayDate._id);
    }

    let nextPlayDateGames: Game[] = [];
    const playDates = Object.values(grslData.playDates).filter(pd => pd.date >= today);
    if (playDates.length > 0) {
      playDates.sort((pd1, pd2) => pd1.date < pd2.date ? -1 : 1);
      const nextPlayDate = playDates[0];
      nextPlayDateGames = games.filter(g => g.playDate._id == nextPlayDate._id);
    }

    games = previousPlayDateGames.concat(nextPlayDateGames);
  }

  if (team) {
    const teamId = parseInt(team);
    games = games.filter((g) => g.homeTeam._id == teamId || g.awayTeam._id == teamId);
  }

  const handleDivChange = (event: SelectChangeEvent) => {
    setDivision(event.target.value);
  }

  const handleYearChange = (event: SelectChangeEvent) => {
    setYear(event.target.value);
  }

  const handleTeamChange = (event: SelectChangeEvent) => {
    setTeam(event.target.value);
  }

  let previousPd = grslData.playDates[1];
  
  return(
    <>
      <Box
        id="hero"
        sx={{ width: '100%' }}
      >
        <Container
          sx={{
            pt: { xs: 10, sm: 14 },
            pb: { xs: 8, sm: 12 },
          }}
        >
          <Box sx={{typography: 'h3', color: 'primary.main'}}>Schedule</Box>
          <Box sx={{ display: 'flex', flexDirection: 'row'}}>
            <FormControl variant="standard" sx={{m: 1, minWidth: 80}}>
              <InputLabel id="year-label">Year</InputLabel>  
              <Select
                labelId="year-label"
                id="year-select"
                value={year}
                onChange={handleYearChange}
              >
                <MenuItem value="This Week">This Week</MenuItem>
                { grslData.years.map(y => 
                  <MenuItem key={y} value={y}>{y}</MenuItem>
                )}
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
            <FormControl variant="standard" sx={{m: 1, minWidth: 80}}>
              <InputLabel id="team-label">Team</InputLabel>  
              <Select
                labelId="team-label"
                id="team-select"
                value={team}
                onChange={handleTeamChange}
              >
                <MenuItem value="">All</MenuItem>
                { Object.values(teamOptions).map(t => 
                  <MenuItem key={t._id} value={t._id}>{t.name}</MenuItem>
                )}
              </Select>
            </FormControl> 
          </Box>
          { games.length == 0 ? <Box sx={{typography: 'h5', mt: 3}}>No games sheduled</Box> : null }
          { games.map(game => {
            const printDate = game.playDate._id != previousPd._id;
            let printMissingSunday = false;
            if (printDate) {
              if (previousPd.date < nextSunday && game.playDate.date >= nextSunday) {
                printMissingSunday = true;
              }
              previousPd = game.playDate;
            }
            return (
            <React.Fragment key={game._id}>
              { printMissingSunday ?
                <Box sx={{typography: 'h5', mt: 3}} id={nextSunday.toISOString().substring(0, 10)}>
                  {nextSunday.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric"})} - 
                  No games scheduled
                </Box> : null
              }
              { printDate ? 
                <Box sx={{typography: 'h5', mt: 3}} id={game.date.toISOString().substring(0, 10)}>
                  {game.date.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric"})}
                </Box> :
                <Divider />
              }
              <GameLine game={game}></GameLine>
            </React.Fragment>
            )
          })}
          { previousPd.date < nextSunday && year == 'This Week' ?
            <Box sx={{typography: 'h5', mt: 3}} id={nextSunday.toISOString().substring(0, 10)}>
              {nextSunday.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric"})} - 
              No games scheduled
            </Box> : null
        }
        </Container>
      </Box>
      <Footer />
    </>
  )
}