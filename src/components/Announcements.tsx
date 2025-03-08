import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';


export default function Announcements() {

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '60%' },
          textAlign: { sm: 'left', md: 'center' },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Announcements
        </Typography>
      </Box>
      <Card sx={{ 
      }}>
        <CardContent>
          <Typography variant="h5">
            March 9 Games Postponed
          </Typography>       
          <Typography>
            Due to the weather forecast this Sunday all matches are postponed until a later date.
          </Typography>
          <Link href="/page/dates">Spring 2025 Key Dates</Link>
        </CardContent>
      </Card>
      <Card sx={{ 
      }}>
        <CardContent>
          <Typography variant="h5">
            Spring 2025 Season
          </Typography>       
          <Typography>
            First Spring match is Sunday, January 12th
          </Typography>
          <Link href="/page/dates">Spring 2025 Key Dates</Link>
        </CardContent>
      </Card>
    </Container>
  );
}
