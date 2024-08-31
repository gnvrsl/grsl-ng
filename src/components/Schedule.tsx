import * as React from 'react';
import { getData } from '../GrslData';
import {
  Box,
  Container,
  Divider
} from '@mui/material';
//import { useState } from 'react';
import GameLine from './GameLine';
import Footer from './Footer';


export default function Schedule() {
  const grslData = getData();

  //const [activeSeasonIdx, setActiveSeason] = useState(33);
  const activeSeason = grslData.seasons[33];
  const seasonGames = activeSeason.games;




  return(
    <>
      <Box
        id="hero"
        sx={{ width: '100%' }}
      >
        <Container
          sx={{
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
          }}
        >
          <h1>{activeSeason.name} Schedule</h1>
          { seasonGames['a'].map(game => {
            if (game) {
              return (
              <React.Fragment key={game._id}>
                <GameLine game={game}></GameLine>
                <Divider />
              </React.Fragment>
            )
            }
            return "undefined game"
          })}
        </Container>
      </Box>
      <Footer />
    </>
  )
}