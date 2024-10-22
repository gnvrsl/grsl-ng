import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import fieldIcon from '../assets/field-icon.png';
import trophyIcon from '../assets/trophy-1c3c63.png';
import jerseyIcon from '../assets/jersey_icon.png';


const logoStyle = {
  height: '100px',
  margin: '0 32px',
};

const tagStyle = {
  textAlign: 'center',
  typography: 'h5'
}

export default function LogoCollection() {

  return (
    <Box id="logoCollection" sx={{ py: 4 }}>
      <Grid container justifyContent="space-around" sx={{ mt: 0.5, opacity: 0.6 }}>
        <Grid item>
          <img
            src={trophyIcon}
            alt={`trophy icon`}
            style={logoStyle}
          />
          <Typography sx={tagStyle}>40+ years</Typography>
        </Grid>
        <Grid item>
          <img
            src={fieldIcon}
            alt={`field icon`}
            style={logoStyle}
          />
          <Typography sx={tagStyle}>28 Teams</Typography>
        </Grid>
        <Grid item>
          <img
            src={jerseyIcon}
            alt={`field icon`}
            style={logoStyle}
          />
          <Typography sx={tagStyle}>700+ Players</Typography>
        </Grid>
      </Grid>
      <Box
        sx={{
          typography: 'h1',
          color: 'primary.light',
          textAlign: 'center',
          mt: 4
        }}
      >
        DIVERSITY. INTEGRITY. RESPECT.
      </Box>
    </Box>
  );
}
