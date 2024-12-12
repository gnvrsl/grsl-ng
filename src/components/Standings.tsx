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
  TableRow,
} from '@mui/material';
import Footer from './Footer';
import { LeagueData } from '../GrslData';
import { useLoaderData, useParams } from "react-router-dom";
import StandingsTableSection from './StandingsTableSection';
import { Game, Standings as IStandings } from '../GrslData';
import { useNavigate } from "react-router-dom";
import GameLine from './GameLine';
import React from 'react';

export default function Standings() {
  const grslData = useLoaderData() as LeagueData;
  const params = useParams<{code: string}>();
  const navigate = useNavigate();

  const activeSeason = grslData.seasons2.find(s => s.code === params.code);
  if (!activeSeason) {
    return <div>Season {params.code} not found</div>
  }
  const leagueNames: any = {
    a: 'Division A',
    b: 'Division B',
    c: 'Division C'
  }  

  let knockoutGames: { [key: string]: Game[] } = {};
  let standingsSections: { title: string, lstandings: IStandings[], division: string }[] = [];
  if (activeSeason.tournament) {
    for (const [division, groups] of Object.entries(activeSeason.season.tournamentStandings)) {
      for (const [group, lstanding] of Object.entries(groups)) {
        if (lstanding.length) {
          standingsSections.push({ 
            title: leagueNames[division] + ' Group ' + group, 
            lstandings: lstanding,
            division: division
          });
        }
      }
    }

    for (let d of Object.keys(leagueNames)) {
      knockoutGames[d] = activeSeason.season.games.filter(g => g.division === d && g.gameType === 's');
      knockoutGames[d].push(...activeSeason.season.games.filter(g => g.division === d && g.gameType === 't'))
      knockoutGames[d].push(...activeSeason.season.games.filter(g => g.division === d && g.gameType === 'f'));
    }
    
  }
  else {
    for (const [division, lstanding] of Object.entries(activeSeason.season.standings)) {
      if (lstanding.length) {
        standingsSections.push({ 
          title: leagueNames[division], 
          lstandings: lstanding,
          division: division
        });
      }
    }
  }

  function handleSeasonChange(event: SelectChangeEvent) {
    const seasonCode = event.target.value as string;
    navigate(`/standings/${seasonCode}`);
  }

  const seasonsList = [...grslData.seasons2].reverse();

  return (
    <>
      <Container
        sx={{
          pt: { xs: 10, sm: 14 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Box sx={{typography: 'h3', color: 'primary.main'}}>Standings</Box>
        <TableContainer sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <Table sx={{ maxWidth: { lg: 80, md: 100 }, mb: 2}}>
            <TableHead>
              <TableRow>
                <TableCell align="right" colSpan={10}>
                <FormControl variant="standard" sx={{m: 1, minWidth: 180}}>
                  <InputLabel id="season-label">Season</InputLabel>  
                  <Select
                    labelId="season-label"
                    id="season-select"
                    value={activeSeason.code}
                    onChange={handleSeasonChange}
                  >
                    { seasonsList.map(s => 
                      <MenuItem key={s.code} value={s.code}>{s.name}</MenuItem>
                    )}
                  </Select>
                </FormControl>
                </TableCell>
              </TableRow>
            </TableHead>
            { Object.keys(leagueNames).map(division =>
                <React.Fragment key={"div" + division}>
                {standingsSections.filter(ss => ss.division === division).map(ss =>
                  <StandingsTableSection key={ss.title} title={ss.title} lstandings={ss.lstandings} />
                )}
                {knockoutGames[division]?.length > 0 &&
                  <>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" colSpan={10} sx={{typography: 'subtitle2'}}>
                          {leagueNames[division]} Knockout Games
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {knockoutGames[division].map(g =>
                        <TableRow key={g._id}>
                          <TableCell colSpan={10}>
                            <GameLine game={g} />
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </>
                }                 
                </React.Fragment>
              )
            }  
          </Table>
        </TableContainer>  
      </Container>
      <Footer />
    </>
  )
}