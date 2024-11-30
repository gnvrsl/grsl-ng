import Container from "@mui/material/Container";
import Footer from "./Footer";
import Box from "@mui/material/Box";
import BoardMemberBio from "./BoardMemberBio";
import martin from '../assets/about/martin.jpg';
import steve from '../assets/about/steve.jpg';
import mary from '../assets/about/mary.jpg';
import rebeca from '../assets/about/rebeca.jpg';
import isaiah from '../assets/about/isaiah.jpg';
import traci from '../assets/about/traci.jpg';
import becca from '../assets/about/becca.jpg';

const boardBios = {
  martin: `Martin Costello is President of the Gainesville Regional Soccer League (GRSL) Board of Directors. Martin has participated in the league since 2016 beginning as a player with the team Starting Reserves before joining Risky Business FC. Now team Captain for Risky Business FC,  Martin has served on the GRSL Board of Directors since 2019 with his first term as Disciplinary Chair. Professionally, Martin is an Engineer with Foghorn Consulting, Inc. Prior to his engineering role, Martin was a Project Manager and Florida Ecological Lead with Normandeau Associates, Inc. Martin is an experienced race director and event coordinator, involved in directed running and triathlon races as well as coordinating race site logistics for large scale triathlons. In addition to soccer, Martin enjoys triathlon, playing waterpolo, and exploring the great outdoors—including additional volunteering with efforts to conserve local habitats and wildlife.
`,
  steve: `Steve Moore is vice president of the Gainesville Regional Soccer League (GRSL) Board of Directors. Steve has participated in the league since 1986 beginning as a player with the team Comets. He was captain of Cristal and played with Sodbusters and then Bollocks FC. He has been the captain of Bollocks FC (with much help from the Bollocks family) since 1998. Steve has served on the GRSL Board and helped with league operations since 2002. Professionally, Steve is an IT Specialist with VHA working in TeleHealth. Prior to his current role, Steve was a software engineer for Phoneomena, Inc., a systems programmer/GIS specialist  in UF SFRC, and a math instructor at SFCC. In addition to soccer, Steve enjoys mountain biking, playing basketball, surfing, snowboarding, canoeing, kayaking, and exploring the great outdoors.
`,
  mary: `Mary Butterworth joined GRSL in 2018 as a player with Nations United. She became the league secretary in 2021, and maintains all GRSL reference materials including player waivers and meeting minutes, creates the quarterly newsletter, organizes league events/parties, and helps with recruiting and marketing. Mary has been playing soccer since she was eleven years old, and has participated in many co-recreational adult leagues throughout New York City, Virginia, North Carolina, and South Carolina before moving to Gainesville in 2017 and finding GRSL! Mary works in background investigations and in her free time, enjoys tennis and running.`,
  rebeca: `Rebeca joined the league as a player in team Nations United. As soon as she became involved, she decided to have a more active role within the league and became the Treasurer in 2019. Rebeca has over 15 years of experience in Accounting. As a Partner in the Accounting and Controllership Services department at James Moore & Co, CPAs, Rebeca has served a multitude of clients in Alachua and neighboring counties. Her experience spans across multiple industries such as non-profit, healthcare, construction, among others. As our Treasurer, Rebeca has been key in the implementation of a new system for referee payments, she develops the organization’s budget, and she ensures the overall financial health of the league. 
`,
  isaiah: `Isaiah joined GRSL as a player with Crash FC in 2015. He then went on to captain the last year for Crash in 2019. Isaiah joined the board in 2021 to help GRSL grow a social media presence and work on getting an entirely new website for the league. Isaiah currently works as a sales director for a hospice company called Vitas. In his spare time, Isaiah spends time with family and friends, travels and watches sports. 
`,
  traci: ``,
  becca: `Becca has been a participant in the GRSL since 2021. She joined as a player for Mondial FC and later moved up to captaining the team. She was elected to the board in 2023 and is the Team and Player Relations member; she connects with new players and captains, helps onboard those in new leadership roles, and runs the biannual recruitment scrimmage.
Becca joined the league looking to play soccer and meet new people, and along the way found a community of like minded individuals who are not only passionate about soccer, but about inclusiveness, respect, and diversity. In her free time, Becca fosters cats through the Humane Society and listens to true crime podcasts.
`,
}

export default function BoardBios() {
  return (
    <>
      <Container
      sx={{
        pt: { xs: 10, sm: 14 },
        pb: { xs: 8, sm: 12 },
      }}
    >
      <Box sx={{typography: 'h3', color: 'primary.main'}}>GRSL Board of Directors</Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <BoardMemberBio name="Martin Costello" role="President" imageSrc={martin} bio={boardBios.martin} />
        <BoardMemberBio name="Steve Moore" role="Vice President" imageSrc={steve} bio={boardBios.steve} />
        <BoardMemberBio name="Rebeca Denehan" role="Treasurer" imageSrc={rebeca} bio={boardBios.rebeca} /> 
        <BoardMemberBio name="Becca Antelis" role="Team and Player Relations" imageSrc={becca} bio={boardBios.becca} />
        <BoardMemberBio name="Mary Butterworth" role="Secretary" imageSrc={mary} bio={boardBios.mary} />
        <BoardMemberBio name="Isaiah Brinza" role="Marketing & Communications" imageSrc={isaiah} bio={boardBios.isaiah} />
        <BoardMemberBio name="Traci Ball" role="Board Member" imageSrc={traci} bio={boardBios.traci} />
      </Box>
    </Container>
    <Footer />
  </>
  )
}