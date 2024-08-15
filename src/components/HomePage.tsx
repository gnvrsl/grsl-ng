import * as React from 'react';
import Hero from './Hero';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import LogoCollection from './LogoCollection';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import Footer from './Footer';


export default function HomePage() {

  return (
    <>
      <Hero />
      <Box sx={{ bgcolor: 'background.default' }}>
        <LogoCollection />
        <Divider />
        <Testimonials />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>
    </>
  )
}
