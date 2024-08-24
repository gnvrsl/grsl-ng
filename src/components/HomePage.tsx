import * as React from 'react';
import Hero from './Hero';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import LogoCollection from './LogoCollection';
import FAQ from './FAQ';
import Footer from './Footer';
import Announcements from './Announcements';


export default function HomePage() {

  return (
    <>
      <Hero />
      <Box sx={{ bgcolor: 'background.default' }}>
        <LogoCollection />
        <Divider />
        <Announcements />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>
    </>
  )
}
