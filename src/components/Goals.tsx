import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { LeagueData, Player } from "../GrslData";
import { useState } from "react";
import { 
  Box, 
  Container, 
  FormControl, 
  InputLabel, 
  MenuItem, 
  Select, 
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

export default function Goals() {
  const grslData = useLoaderData() as LeagueData;
  const params = useParams<{code: string}>();
  const navigate = useNavigate();
  const [division, setDivision] = useState('');
  const [gender, setGender] = useState('');

  const season = Object.values(grslData.seasons).find(s => s.code === params.code);
  if (!season) {
    return <div>Season {params.code} not found</div>
  }

  const cardCounts: { [key: number] : {player: Player, yellow: number, red: number, goals: number}} = {};
  
  for (const card of season.cards) {
    if (!cardCounts[card.player._id]) {
      cardCounts[card.player._id] = { player: card.player, red: 0, yellow: 0, goals: 0 };
    }
    if (card.color == 'r') {
      cardCounts[card.player._id].red++;
    } else {
      cardCounts[card.player._id].yellow++;
    }
  }

  for (const goal of season.goals) {
    if (!cardCounts[goal.player._id]) {
      cardCounts[goal.player._id] = { player: goal.player, red: 0, yellow: 0, goals: 0 };
    }
    cardCounts[goal.player._id].goals++;
  }

  const cardsGoalsList = Object.values(cardCounts).sort((a, b) => 
    a.goals < b.goals ? 1 : -1);


  function handleSeasonChange(event: SelectChangeEvent) {
    const seasonCode = event.target.value as string;
    navigate(`/goals/${seasonCode}`); 
  }

  const handleDivChange = (event: SelectChangeEvent) => {
    setDivision(event.target.value);
  }

  const handleGenderChange = (event: SelectChangeEvent) => {
    setGender(event.target.value);
  };

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
        <Box sx={{typography: 'h3', color: 'primary.main'}}>Goals</Box>
        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
          <FormControl variant="standard" sx={{m: 1, minWidth: 180}}>
            <InputLabel id="season-label">Season</InputLabel>  
            <Select
              labelId="season-label"
              id="season-select"
              value={season.code}
              onChange={handleSeasonChange}
            >
              { Object.values(grslData.seasons).map(s => 
                <MenuItem key={s.code} value={s.code}>{s.name}</MenuItem>
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
            <InputLabel id="gender-label">Gender</InputLabel>  
            <Select
              labelId="gender-label"
              id="gender-select"
              value={gender}
              onChange={handleGenderChange}
            >
              <MenuItem value="">Any</MenuItem>
              <MenuItem value="a">M</MenuItem>
              <MenuItem value="b">F</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
        <TableContainer id="cards"
              sx={{ 
                gridColumn: { xs: 1, md: 2},
                gridRow: { xs: 4, md: 2},
              }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Player</TableCell>
                      <TableCell align="right">Goals</TableCell>
                      <TableCell align="right">YC</TableCell>
                      <TableCell align="right">RC</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cardsGoalsList.map(c => 
                      <TableRow key={c.player._id}>
                        <TableCell>{c.player.firstName} {c.player.lastName}</TableCell>
                        <TableCell align="right">{c.goals}</TableCell>
                        <TableCell align="right">{c.yellow}</TableCell>
                        <TableCell align="right">{c.red}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>  
              </TableContainer>
        </Box>

      </Container>
    </Box>
    </>  
  )
}
