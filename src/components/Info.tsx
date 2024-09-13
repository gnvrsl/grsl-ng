import { Container, Box, Typography } from '@mui/material';
import Footer from './Footer';

export default function Info() {
  return (
    <>
    <Container
      id="info-page"
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
          Information
        </Typography>
      </Box>
      <Typography>
      GRSL is a non-profit organization founded in 1982 with the objective to provide Gainesville Florida and the surrounding communities
       with an organized avenue to play adult co-recreational soccer. The organization was instrumental in the development of the 
       three fields at Abby Wambach Park and has continued to contribute to Alachua County Parks and Recreation in the fulfillment of its
        management agreement. With participation of over 600 players, the league hosts twenty four co-rec teams in three seasons
         throughout the calendar year. There are three divisions of play accommodating a wide range of skills and experience – play is 
         recreational but very competitive. Games are typically scheduled on Sundays and are officiated by state certified referees.
      </Typography>
    </Container>
    <Footer />
    </>
  );
}