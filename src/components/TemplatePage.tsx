import Container from "@mui/material/Container";
import Footer from "./Footer";
import Box from "@mui/material/Box";

export default function TemplatePage() {
  return (
    <>
      <Container
      sx={{
        pt: { xs: 10, sm: 14 },
        pb: { xs: 8, sm: 12 },
      }}
    >
      <Box sx={{typography: 'h4'}}>Page Title</Box>
    </Container>
    <Footer />
  </>
  )
}