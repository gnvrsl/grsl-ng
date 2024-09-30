import { FieldLining } from '../GrslData';
import {
  Box,
  Link,
  Paper,
  Stack
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Link as RouterLink } from 'react-router-dom';

interface LiningLineProps {
  lining: FieldLining,
  includeDate?: boolean
}

export default function GameLine({ lining, includeDate} : LiningLineProps) {
  const theme = useTheme();
  const shortNames = useMediaQuery(theme.breakpoints.down('sm'));
  const mediumNames = useMediaQuery(theme.breakpoints.down('md'));

  function timeString(date: Date) {
    let timeStr = date.toLocaleTimeString(undefined, {hour12: true, timeStyle: "short"});
    timeStr = timeStr.replace(' AM', 'am').replace(' PM', 'pm');
    return timeStr;
  }

  const short = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <Box sx={{
      alignItems: 'spaceAround',
      display: 'flex', 
      flexDirection: 'row'}}>
      <Box sx={{flex: 1, display: 'flex', flexDirection: 'row'}}>
        <Stack sx={{ flex: 1 }}>
          <Box sx={{typography: 'subtitle1', fontSize: {xs: '.8rem', sm: '.9rem', md: '1rem'}}}>
            { mediumNames ? lining.location : lining.location}
          </Box>
          { includeDate ? 
            <>
              <Box sx={{typography: 'subtitle1', fontSize: {xs: '.8rem', sm: '.9rem', md: '1rem'}}}>
                {lining.date.toLocaleDateString() + ' '} 
                { !short && timeString(lining.date)}
              </Box>
              <Box sx={{typography: 'subtitle1', fontSize: {xs: '.8rem', sm: '.9rem', md: '1rem'}}}>
                { short && timeString(lining.date)}
              </Box>
            </>
            :
            <Box sx={{typography: 'subtitle1'}}>
              { short && timeString(lining.date)}
            </Box>
          }

        </Stack>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <Link component={RouterLink} 
            to={'/team/' + lining.team1.code} 
            
            sx={{ 
              textDecoration: 'none', 
              color: 'primary',
              typography: 'h5',
              fontFamily: { xs: 'Sono', sm: 'poppins'}
              }}> 
            { shortNames ? lining.team1.code : lining.team1.name}
          </Link>
        </Box> 
      </Box>
      <Paper sx={{
          typography: 'h6', 
          m: 1, 
          display: 'flex', 
          flexDirection: 'row',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '48px'}}>
          -
      </Paper>
      <Box sx={{flex: 1, display: 'flex', flexDirection: 'row'}}>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          { lining.team2 &&
            <Link component={RouterLink} 
              to={'/team/' + lining.team2.code} 
              sx={{ 
                textDecoration: 'none', 
                color: 'primary',
                typography: 'h5',
                fontFamily: { xs: 'Sono', sm: 'poppins'}
                }}> 
              { shortNames ? lining.team2.code : lining.team2.name}
            </Link>
        }
        </Box>
        <Stack sx={{ flex: 1}}>
          <Box sx={{ textAlign: 'right', typography: 'subtitle1'}}>
            Field Lining
          </Box>
        </Stack>
      </Box>
    </Box>
  )

}
