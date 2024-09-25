import * as React from 'react';
import { PaletteMode } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import ToggleColorMode from './ToggleColorMode';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';


interface AppAppBarProps {
  mode: PaletteMode;
  toggleColorMode: () => void;
  router: { navigate: (url: string) => void };
}

function AppAppBar({ mode, toggleColorMode, router}: AppAppBarProps) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  /** 
  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      setOpen(false);
    }
  };
  */

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >

        <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'row'}}>
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box id="imageSpacer" sx={{ width: '110px', position: 'relative' }}>
              <a onClick={() => router.navigate('/')}
                style={{ 
                  position: 'absolute', 
                  zIndex: 3, 
                  top: -42,
                }}>
              <img src="/Primary-GRSL.png"
                onClick={() => router.navigate('/')}
                style={{ 
                  height: '82px',
                  cursor: 'pointer'
                }} alt="GRSL logo" />
              </a>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <MenuItem
                  onClick={() => router.navigate("/")}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Home
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => router.navigate('/schedule')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Schedule
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => router.navigate("/standings")}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Standings
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => router.navigate("/teams")}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    Teams
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => router.navigate("/about")}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    About
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              <IconButton
                color="primary"
                href="https://www.facebook.com/grslsoccer"
                aria-label="Facebook"
                sx={{ alignSelf: 'center' }}
              >
                <FacebookIcon />
              </IconButton>
              <IconButton
                color="primary"
                href="https://www.instagram.com/gvilleregionalsoccerleague/"
                aria-label="Instagram"
                sx={{ alignSelf: 'center' }}
              >
                <InstagramIcon />
              </IconButton>
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
                  </Box>
                  <MenuItem onClick={() => {router.navigate('/'); setOpen(false);}}>
                    Home
                  </MenuItem>
                  <MenuItem onClick={() => {router.navigate('/schedule'); setOpen(false);}}>
                    Schedule
                  </MenuItem>
                  <MenuItem onClick={() => {router.navigate('/standings'); setOpen(false);}}>
                    Standings
                  </MenuItem>
                  <MenuItem onClick={() => {router.navigate('/teams'); setOpen(false);}}>
                    Teams
                  </MenuItem>
                  <MenuItem onClick={() => {router.navigate('/about'); setOpen(false);}}>
                    About
                  </MenuItem>
                  <Divider />
                  <MenuItem sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                  }}>
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
                  </MenuItem>
                  <MenuItem>
                    Contact us: <Link href="mailto:grslboard@gmail.com">grslboard@gmail.com</Link>                  
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default AppAppBar;
