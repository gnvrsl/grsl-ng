import { useParams } from "react-router-dom";
import { getPlayerData, Season, Standings, Player } from "../GrslData";
import {
  Box, 
  Card, 
  CardContent, 
  Container,
  Divider,
  Table, 
  TableBody, 
  TableCell, 
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ShirtIcon from "./ShirtIcon";
import GameLine from "./GameLine";
import Footer from "./Footer";

export default function TeamPage() {
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
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gridAutoRows: 'auto',
          width: '100%'
        }}>
          <Box sx={{
            gridColumn: '1 / 3',
            display: 'flex', 
            flexDirection: 'row', 
            typography: 'h4', 
            width: '100%'}}>
            <Box sx={{}}>{team.name}</Box> <Box sx={teamCodeStyle}>{team.code}</Box>
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
            gridColumn: { xs: '1 /  4', md: '3' },
            gridRow: { xs: '2', md: '1 / 3'},

          }}>
            <CardContent>
              <Box sx={{mb: 1}}>
                <Box sx={{ typography: 'caption' }}>Captain</Box>
                <Box>{team.captain1?.firstName} {team.captain1?.lastName}</Box>
                <Box>{team.captain2?.firstName} {team.captain2?.lastName}</Box>
              </Box>
              <Box sx={{mb: 1}}>
                <Box sx={{ typography: 'caption' }}>Recent Season</Box>
                {teamStandings[0].season.name},
                Division {teamStandings[0].division.toUpperCase()}
              </Box>
              <Box sx={{mb: 1}}>
                <Box sx={{ typography: 'caption' }}>All-time Record</Box>
                 {team.wins}W - {team.draws}D - {team.losses}L
              </Box>  
              <Box sx={{mb: 1}}>
                <Box sx={{ typography: 'caption' }}>Rank</Box>
                {team.rank} ({team.rating.toFixed(1)})
              </Box>
              <Box sx={{mb: 1}}>
                <Box sx={{ typography: 'caption' }}>Primary Shirt</Box>
                <ShirtIcon shirtColor={team.jersey1} />
              </Box>
            </CardContent>          
          </Card>
          <Box
            sx={{
              gridColumn: '1',
              gridRow: { xs: 3, md: 2},
              mt: 2
          }}>
            <Box>
              <Box sx={{typography: 'caption'}}>Field Lining</Box>
              <Box>
                N/A
              </Box>
            </Box>
            <Box>
              <Box sx={{typography: 'caption'}}>Suspensions</Box>
              <Box>N/A</Box>
            </Box>
            <Box>
              <Box sx={{typography: 'caption'}}>Card Points</Box>
              <Box>{cardPoints}</Box>
            </Box>
          </Box>
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

        <Box id="recent-games" sx={{ width: "100%", mb: 4 }}>
          <Box sx={{typography: 'h5', mt: 3}}>{season.name}</Box>
            {teamGames.map(g =>
            <>
              <GameLine game={g} />
              <Divider />
            </>  
            )}
          </Box>  
        <Box id="standings">
          <TableContainer>
            <Table sx={{ maxWidth: { lg: 80, md: 100 }, mb: 2}}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={8} sx={{typography: 'subtitle2'}}>
                    Seasons
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ minWidth: { sm: 100, md: 180}}}>Season</TableCell>
                  <TableCell>Div.</TableCell>
                  <TableCell>Rank</TableCell>
                  <TableCell>Wins</TableCell>
                  <TableCell>Draws</TableCell>
                  <TableCell>Losses</TableCell>
                  <TableCell>Points</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teamStandings.map(s =>
                  <TableRow key={s.season._id + s.division + (s.group || '')}>
                    <TableCell>{s.tournament ? s.season.name + " - T" : s.season.name}</TableCell>
                    <TableCell>{s.tournament ? s.division.toUpperCase() + s.group : s.division.toUpperCase()}</TableCell>
                    <TableCell>{s.standings.rank}</TableCell>
                    <TableCell>{s.standings.wins}</TableCell>
                    <TableCell>{s.standings.draws}</TableCell>
                    <TableCell>{s.standings.losses}</TableCell>
                    <TableCell>{s.standings.points}</TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </TableContainer>   
        </Box>    
      </Container>
      <Footer />
    </>
  )
}