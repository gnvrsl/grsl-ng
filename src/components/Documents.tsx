import Container from "@mui/material/Container";
import Footer from "./Footer";
import Box from "@mui/material/Box";
import DocumentCard from "./DocumentCard";
import bylaws from '../assets/GRSLByLaws.pdf';
import summerRules from '../assets/SummerRulesandRegulations-8v8.pdf';
import fallSpringRules from '../assets/FALL2023CORECRULES-APPROVED23AUG2023.pdf';
import lotg from '../assets/LOTG2024_25.pdf';
import codeOfConduct from '../assets/GRSL-CODE-OF-CONDUCT.pdf';
import playerWaiver from '../assets/GRSL-CoG-USSSA-Waiver-FALL-2023.pdf';

export default function Documents() {
  return (
    <>
      <Container
      sx={{
        pt: { xs: 10, sm: 14 },
        pb: { xs: 8, sm: 12 },
      }}
    >
      <Box sx={{typography: 'h3', color: 'primary.main'}}>Documents</Box>
      <Box sx={{ 
        mt: 3,
        display: 'grid',
        gap: 4,
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
      }}>
        <DocumentCard title="Code of Conduct" url={codeOfConduct} />
        <DocumentCard title="Player Waiver" url={playerWaiver} />
        <DocumentCard title="GRSL Bylaws" url={bylaws} />
        <DocumentCard title="Summer Rules" url={summerRules} />
        <DocumentCard title="Fall/Spring Rules" url={fallSpringRules} />
        <DocumentCard title="Laws of the Game" url={lotg} />
      </Box>
    </Container>
    <Footer />
  </>
  )
}