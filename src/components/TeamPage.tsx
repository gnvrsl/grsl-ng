import * as React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { getPlayerData, Season, Standings, Player } from "../GrslData";
import {
  Box, 
  Card, 
  CardContent, 
  Container,
  Divider,
  Tab,
  Tabs,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import ShirtIcon from "./ShirtIcon";
import GameLine from "./GameLine";
import Footer from "./Footer";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function TeamPage() {
  const [tabValue, setTabValue] = useState(0);
  const params = useParams();
  const grslData = getPlayerData();
  const tc = params.code?.toLowerCase();

  const team = Object.values(grslData.teams).find(t => t.code.toLowerCase() == tc);
  if (!team) throw new Error(`Team ${params.code} not found`);

  const season = team.seasons[0];

  interface TeamStandings {
    season: Season;
    division: string;
    tournament: boolean;
    group: string | null;
    standings: Standings;
  }

  const teamStandings: TeamStandings[] = [];
  for (const season of Object.values(grslData.seasons)) {
    for (const [division, standings] of Object.entries(season.standings)) {
      for (const record of standings) {
        if (record.team._id == team._id)  {
          teamStandings.push({
            season: season,
            division: division,
            tournament: false,
            group: null,
            standings: record
          });
        }
      }
    }
    for (const [division, tournamentStandings] of Object.entries(season.tournamentStandings)) {
      for (const [group, standings] of Object.entries(tournamentStandings)) {
        for (const record of standings) {
          if (record.team._id == team._id) {
            teamStandings.push({
              season: season,
              division: division,
              tournament: true,
              group: group,
              standings: record
            });
          }
        }
      }
    }
  }

  teamStandings.sort((a, b) => {
    return a.season.start > b.season.start ? -1 : 1;
  });    

  // Team games
  const teamGames = Object.values(grslData.games).filter(g => 
    (g.homeTeam._id == team._id || g.awayTeam._id == team._id) && g.season._id == season._id);

  // Cards
  const teamCards = season.cards.filter(c => c.team?._id == team._id);
  const cardPoints = teamCards.reduce((prev, cur) => prev + (cur.color == 'r' ? 3 : 1), 0);

  const cardCounts: { [key: number] : {player: Player, yellow: number, red: number, goals: number}} = {};
  for (const card of teamCards) {
    if (!cardCounts[card.player._id]) {
      cardCounts[card.player._id] = { player: card.player, red: 0, yellow: 0, goals: 0 };
    }
    if (card.color == 'r') {
      cardCounts[card.player._id].red++;
    } else {
      cardCounts[card.player._id].yellow++;
    }
  }

  // Goals  
  const teamGoals = season.goals.filter(g => g.team?._id == team._id);
  for (const goal of teamGoals) {
    if (!cardCounts[goal.player._id]) {
      cardCounts[goal.player._id] = { player: goal.player, red: 0, yellow: 0, goals: 0 };
    }
    cardCounts[goal.player._id].goals++;
  }


  const cardsGoalsList = Object.values(cardCounts).sort((a, b) => 
    a.goals < b.goals ? 1 : -1);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };


  const teamCodeStyle = {
    fontFamily: 'monospace',
    fontSize: '1.3rem',
    fontWeight: '600',
    mt: 2,
    ml: 1,
  }

  return (
    <>
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
          width: '100%'
        }}>
          <Box sx={{
            display: 'flex', 
            flexDirection: {xs: 'column', sm: 'row'}, 
            width: '100%'}}>
            <Box sx={{ color: 'primary.main', typography: 'h3'}}>{team.name}</Box> 
            <Box sx={teamCodeStyle}>{team.code}</Box>
            <Box sx={{
              typography: 'h5', 
              flex: 1, 
              textAlign: 'right',
              mr: 2,
              mt: 2
            }}>
                {season.name}
            </Box>
          </Box>
          <Card sx={{
          }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid xs={6} sm={4} md={2}>
                  <Box sx={{ typography: 'caption' }}>Captain(s)</Box>
                  <Box>{ team.captain1 ? team.captain1?.firstName + " " + team.captain1?.lastName: "N/A"}</Box>
                  <Box>{team.captain2?.firstName} {team.captain2?.lastName}</Box>
                </Grid>
                <Grid xs={6} sm={4} md={2}>
                  <Box sx={{ typography: 'caption' }}>Primary Shirt</Box>
                  <ShirtIcon shirtColor={team.jersey1} />
                </Grid>
                <Grid xs={6} sm={4} md={2}>
                  <Box sx={{ typography: 'caption' }}>All-time Record</Box>
                  {team.wins}W - {team.draws}D - {team.losses}L
                </Grid>  
                <Grid xs={6} sm={4} md={2}>
                  <Box sx={{ typography: 'caption' }}>Recent Season</Box>
                  {teamStandings[0].season.name}             
                </Grid>
                <Grid xs={6} sm={4} md={2}>
                  <Box sx={{ typography: 'caption' }}>Season Standing</Box>
                  {teamStandings[0].standings.rank}, Division {teamStandings[0].division.toUpperCase()}
                </Grid>

                <Grid xs={6} sm={4} md={2}>
                  <Box sx={{ typography: 'caption' }}>Rank</Box>
                  {team.rank} ({team.rating.toFixed(1)})
                </Grid>
                <Grid xs={6} sm={4} md={2}>
                  <Box sx={{typography: 'caption'}}>Card Points</Box>
                  <Box>{cardPoints}</Box>
                </Grid>
              </Grid>
            </CardContent>          
          </Card>
          
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="team data tabs">
                <Tab label="Schedule" {...a11yProps(0)} />
                <Tab label="Stats" {...a11yProps(1)} />
                <Tab label="History" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={tabValue} index={0}>
              <Box id="recent-games" sx={{ width: "100%", mb: 4 }}>
                {teamGames.map(g =>
                <React.Fragment key={g._id}>
                  <GameLine game={g} includeDate={true} />
                  <Divider />
                </React.Fragment>  
                )}
              </Box> 
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={1}>
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
            </CustomTabPanel>
            <CustomTabPanel value={tabValue} index={2}>
              <TableContainer>
                <Table sx={{}}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ minWidth: { sm: 100, md: 180}}}>Season</TableCell>
                      <TableCell>Div.</TableCell>
                      <TableCell align="right">Rank</TableCell>
                      <TableCell align="right">Wins</TableCell>
                      <TableCell align="right">Draws</TableCell>
                      <TableCell align="right">Losses</TableCell>
                      <TableCell align="right">Points</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {teamStandings.map(s =>
                      <TableRow key={s.season._id + s.division + (s.group || '')}>
                        <TableCell sx={{ fontSize: '1.1rem'}}>{s.tournament ? s.season.name + " - T" : s.season.name}</TableCell>
                        <TableCell sx={{ fontSize: '1.1rem'}}>{s.tournament ? s.division.toUpperCase() + s.group : s.division.toUpperCase()}</TableCell>
                        <TableCell align="right" sx={{ fontSize: '1.6rem', fontWeight: 'medium'}}>{s.standings.rank}</TableCell>
                        <TableCell align="right" sx={{ fontSize: '1.3rem'}}>{s.standings.wins}</TableCell>
                        <TableCell align="right" sx={{ fontSize: '1.3rem'}}>{s.standings.draws}</TableCell>
                        <TableCell align="right" sx={{ fontSize: '1.3rem'}}>{s.standings.losses}</TableCell>
                        <TableCell align="right" sx={{ fontSize: '1.3rem'}}>{s.standings.points}</TableCell>
                      </TableRow>)}
                  </TableBody>
                </Table>
              </TableContainer> 
            </CustomTabPanel>
          </Box>
        </Box> 
      </Container>
      <Footer />
    </>
  )
}