import { Container, Box, Typography, Card, CardContent, CardMedia } from '@mui/material';
import Footer from './Footer';
import blueBall from '../assets/about/blueball.png';
import jasonImage from '../assets/about/jason.jpg';
import fpReopening from '../assets/about/fp-reopening.jpeg';
import bishopHuddle from '../assets/about/bishop-huddle3.webp';
import martin from '../assets/about/martin.jpg';
import steve from '../assets/about/steve.jpg';
import mary from '../assets/about/mary.jpg';
import rebeca from '../assets/about/rebeca.jpg';
import isaiah from '../assets/about/isaiah.jpg';
import john from '../assets/about/john.jpg';
import BoardMember from './BoardMember';

const textBlurbs = {
  a: `Gainesville Regional Soccer League is a non-profit organization founded in 1982
    to bring adults from all backgrounds together through soccer.`,
  b: ` GRSL is the premier co-ed league in the region with more than 700 players across 25 
co-recreational teams. With three divisions of play – each with a different level of competition
 – we’re proud to have options for any level of skill and experience.`,
  c: `Games are played on Sundays in three seasons throughout the calendar year; spring, summer, and
 fall. State-certified referees keep our games fair and encourage sportsmanship between teams.
  Our goal is to provide an organized, inclusive, and exciting way for men and women to play 
  soccer together. And we’re always looking to add to our rosters of players, teams, and 
  referees.`,
  d: `GRSL is always looking for ways to improve our community and bring soccer to everyone! 
  Our organization was instrumental in the development of three soccer fields at Forest Park,
   where we meet to play. We continue to contribute to the Alachua County Parks and Recreation
    Department to assist with the management of these fields.`,
  e: `Our league is open to any who want to play. We celebrate diversity on our teams, among
   our captains, and on our board of directors. GRSL is intentional about bringing soccer to as
    many adults as we can. With Sunday games, three divisions, and seasons throughout the year,
     we strive to be accessible to all who want to play.`
}


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
        gap: { xs: 3, sm: 6 }
      }}
    >
      <img src={blueBall} />
      <Box
        sx={{
          typography: 'h1',
          color: 'primary.main',
          textAlign: 'center'
        }}
      >
        DIVERSITY. INTEGRITY. RESPECT.
      </Box>
      <Box sx={{ typography: 'h4', textAlign: 'center' }}>
        {textBlurbs.a}
      </Box>
    </Container>
    <Container>
      <Box sx={{ 
        display:'grid',
        gap: 2,
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '2fr 1fr' },
        pb: 2
      }}>
        <Card sx={{ gridColumn: 1, gridRow: { xs: 2, sm: 1}}}>
          <CardContent sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <Typography gutterBottom variant="h2" component="div">
              About Our League
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {textBlurbs.b}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {textBlurbs.c}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ gridColumn: {xs: 1, sm: 2}, gridRow: 1}}>
          <CardMedia sx={{ height: '100%', minHeight: '600px' }} 
            image={jasonImage} title="A GRSL player" />
        </Card>
      </Box>
      <Box sx={{ 
        display:'grid',
        gap: 2,
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '2fr 1fr' },
        mb: 2
      }}>
        <Card sx={{ gridColumn: 1, gridRow: 1}}>
          <CardMedia sx={{ height: '100%', minHeight: '600px' }} 
            image={fpReopening} title="Forest Park Reopening" />
        </Card>
        <Card sx={{ gridColumn: { xs: 1, sm: 2}, gridRow: { xs: 2, sm: 1}}}>
          <CardContent sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <Typography gutterBottom variant="h2" component="div">
              Our Contribution
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {textBlurbs.d}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box sx={{ 
        display:'grid',
        gap: 2,
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr' },
        pb: 2
      }}>
        <Card sx={{ gridColumn: 1, gridRow: { xs: 2, sm: 1}}}>
          <CardContent sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <Typography gutterBottom variant="h2" component="div">
              Soccer for All
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              {textBlurbs.e}
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ gridColumn: {xs: 1, sm: 2}, gridRow: 1}}>
          <CardMedia sx={{ height: '100%', minHeight: '600px' }} 
            image={bishopHuddle} title="Bishop FC huddle" />
        </Card>
      </Box>
    </Container>
    <Box sx={{
      backgroundColor: 'primary.dark',
    }}>
      <Container>
        <Typography variant="h2" 
          sx={{ color: 'secondary.contrastText', textAlign: 'center', mb: 4, pt: 2}}>
          Meet the GRSL Board of Directors
        </Typography>
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
        }}>
          <BoardMember name="Martin Costello" role="President" imageSrc={martin} />
          <BoardMember name="Steve Moore" role="Vice President" imageSrc={steve} />
          <BoardMember name="Rebeca Denehan" role="Treasurer" imageSrc={rebeca} />  
          <BoardMember name="Mary Butterworth" role="Secretary" imageSrc={mary} />
          <BoardMember name="Isaiah Brinza" role="Marketing & Communications" imageSrc={isaiah} />
          <BoardMember name="John Malanchuk" role="Special Projects" imageSrc={john} />
        </Box>
      </Container>
    </Box>
    <Footer />
    </>
  );
}