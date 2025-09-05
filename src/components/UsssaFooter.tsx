import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import UsssaLogoFull from '../assets/grsl-logos/usssa.jpeg';
import bylaws from '../assets/GRSLByLaws.pdf';
import summerRules from '../assets/SummerRulesandRegulations-8v8.pdf';
import fallSpringRules from '../assets/FALL2023CORECRULES-APPROVED23AUG2023.pdf';
import lotg from '../assets/LOTG2024_25.pdf';

const logoStyle = {
  width: '480px',
  maxWidth: '100vw',
  height: 'auto',
};

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      Gainesville Regional Soccer League&nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function UsssaFooter() {
  return (
    <>
      <Divider />
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 4, sm: 8 },
          py: { xs: 8, sm: 10 },
          textAlign: { sm: 'center', md: 'left' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              minWidth: { xs: '100%', sm: '60%' },
            }}
          >
            <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
              <Box sx={{ ml: '-15px' }}>
                <img
                  src={UsssaLogoFull}
                  style={logoStyle}
                  alt="logo of sitemark"
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              Contact
            </Typography>
            <Link color="text.secondary" href="mailto:grslboard@gmail.com">grslboard@gmail.com</Link>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'none', md: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" fontWeight={600}>
              Documents
            </Typography>
            <Link color="text.secondary" href={bylaws} target="_blank">
              GRSL Bylaws
            </Link>
            <Link color="text.secondary" href={fallSpringRules} target="_blank">
              Fall/Spring Regulations
            </Link>
            <Link color="text.secondary" href={summerRules} target="_blank">
              Summer Regulations
            </Link>
            <Link color="text.secondary" href={lotg} target="_blank">
              Laws of the Game
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            pt: { xs: 4, sm: 8 },
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <div>
            <Copyright />
          </div>
          <Box sx={{ typography: 'body2', color: 'text.secondary'}}>
            Website by <a href="https://pancakelogic.com">Pancake Logic</a>

          </Box>
          <Stack
            direction="row"
            justifyContent="left"
            spacing={1}
            useFlexGap
            sx={{
              color: 'text.secondary',
            }}
          >
            
            <IconButton
              color="inherit"
              href="https://www.facebook.com/grslsoccer"
              aria-label="Facebook"
              sx={{ alignSelf: 'center' }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              color="inherit"
              href="https://www.instagram.com/gvilleregionalsoccerleague/"
              aria-label="Instagram"
              sx={{ alignSelf: 'center' }}
            >
              <InstagramIcon />
            </IconButton>
          </Stack>
        </Box>
      </Container>
    </>
  );
}
