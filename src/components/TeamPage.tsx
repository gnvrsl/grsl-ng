import { useParams } from "react-router-dom";
import { getData, Season, Standings } from "../GrslData";
import {
  Box, 
  Card, 
  CardContent, 
  Container,
  Divider,
  Table, 
  TableCell, 
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ShirtIcon from "./ShirtIcon";
import GameLine from "./GameLine";

export default function TeamPage() {
  const params = useParams();
  const grslData = getData();
  const tc = params.code?.toLowerCase();

  const team = Object.values(grslData.teams).find(t => t.code.toLowerCase() == tc);
  if (!team) throw new Error(`Team ${params.code} not found`);

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
  const teamGames = Object.values(grslData.games).filter(g => g.homeTeam._id == team._id || g.awayTeam._id == team._id);
  const recentGames = teamGames.reverse().slice(0, 10);

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
          </Box>
          <Card sx={{
            gridColumn: '3',
            gridRow: '1 / 3',

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
          <Box id="schedule">
    
          </Box>

          <Box id="roster">
          
          </Box>
        </Box>
        <Box id="recent-games" sx={{ width: "100%", mb: 4 }}>
          <Box sx={{typography: 'h5', mt: 3}}>Recent Games</Box>
            {recentGames.map(g =>
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
              </TableHead>
              <TableRow>
                <TableCell sx={{ minWidth: { sm: 100, md: 180}}}>Season</TableCell>
                <TableCell>Div.</TableCell>
                <TableCell>Rank</TableCell>
                <TableCell>Wins</TableCell>
                <TableCell>Draws</TableCell>
                <TableCell>Losses</TableCell>
                <TableCell>Points</TableCell>
              </TableRow>
            
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
            </Table>
          </TableContainer>   
        </Box>    
      </Container>
    </>
  )
}