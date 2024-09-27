import { Standings } from '../GrslData';
import {
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Link
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface StandingsTableSectionProps {
  title: string;
  lstandings: Standings[];
}

export default function StandingsTableSection({title, lstandings}: StandingsTableSectionProps) {
  const theme = useTheme();
  const short = useMediaQuery(theme.breakpoints.down('sm'));
  const medium = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <TableHead>
        <TableRow>
          <TableCell align="center" colSpan={10} sx={{typography: 'subtitle2'}}>
            {title}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>Team</TableCell>
          <TableCell align="right">{medium ? "W" : "Wins"}</TableCell>
          <TableCell align="right">{medium ? "D" : "Draws"}</TableCell>
          <TableCell align="right">{medium ? "L" : "Losses"}</TableCell>
          <TableCell align="right">{short ? "P" : "Points"}</TableCell>
          { short ? "" :
            <>
            <TableCell align="right">GF</TableCell>
            <TableCell align="right">GA</TableCell>
            </> 
          }
          <TableCell align="right">GD</TableCell>  
        </TableRow>  
      </TableHead> 
      <TableBody>
        { lstandings.map(s => 
          <TableRow
            key={s.team.name}
          >
            <TableCell>{s.rank}</TableCell>
            <TableCell sx={{ 
              minWidth: { sm: 100,  md: 200 },
              fontSize: '1.1rem'  
            }}>
              <Link component={RouterLink} 
                to={'/team/' + s.team.code} 
                sx={{ 
                  textDecoration: 'none', 
                  typography: 'h5',
                  color: 'primary',
                  fontFamily: { xs: 'monospace', sm: 'poppins'}
                }}>
              {short ? s.team.code : s.team.name}
              </Link>
            </TableCell>
            <TableCell align="right" sx={{ fontSize: '1.3rem'}}>{s.wins}</TableCell>
            <TableCell align="right" sx={{ fontSize: '1.3rem'}}>{s.draws}</TableCell>
            <TableCell align="right" sx={{ fontSize: '1.3rem'}}>{s.losses}</TableCell>
            <TableCell align="right" sx={{ fontSize: '1.6rem', fontWeight: 'medium' }}>{s.points}</TableCell>
            { short ? "": 
              <>
                <TableCell align="right" sx={{ fontSize: '1.3rem'}}>{s.goalsFor}</TableCell>
                <TableCell align="right" sx={{ fontSize: '1.3rem'}}>{s.goalsAgainst}</TableCell>
              </>
            }
            <TableCell align="right" sx={{ fontSize: '1.3rem'}}>{s.goalDifference}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </>
  )
}