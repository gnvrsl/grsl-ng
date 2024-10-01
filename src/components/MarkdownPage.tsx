import Container from "@mui/material/Container";
import Footer from "./Footer";
import Markdown from "react-markdown";
import { useLoaderData } from "react-router-dom";
import { Box } from "@mui/material";

export async function loadMarkdownPage({ params }: any) {
  const response = await fetch(`/pages/${params.page}.md`);
  const mdText = await response.text();
  return { mdText };
}


export default function MarkdownPage() {
  const { mdText } = useLoaderData() as any;

  const components = {
    h1: (props: any) => {
      const {node, ...rest} = props;
      return (
        <Box sx={{typography: 'h3', color: 'primary.main'}} {...rest} />
      )
    }
  }


  return (
    <>
      <Container
      sx={{
        pt: { xs: 10, sm: 14 },
        pb: { xs: 8, sm: 12 },
      }}
      >
        <Markdown components={components}>{mdText}</Markdown>
      </Container>
      <Footer />
    </>
  );
}
