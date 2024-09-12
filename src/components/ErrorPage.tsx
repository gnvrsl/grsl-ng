import Container from "@mui/material/Container";
import Footer from "./Footer";
import Box from "@mui/material/Box";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string, message?: string };
  console.error(error);

  return (
    <>
      <Container
      sx={{
        pt: { xs: 10, sm: 14 },
        pb: { xs: 8, sm: 12 },
      }}
    >
      <Box sx={{typography: 'h4'}}>Application Error</Box>
      <Box>
        An error occurred while processing your request.
      </Box>
      <Box>
        {error.statusText || error.message}
      </Box>
    </Container>
    <Footer />
  </>
  )
}