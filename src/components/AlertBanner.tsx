import Alert from "@mui/material/Alert";
import { Box, Typography } from "@mui/material";

interface AlertBannerProps {
  message: string;
}

// Define the AlertBanner component
export default function AlertBanner({ message }: AlertBannerProps) {
  if (!message) return null;
  return (
    <Box sx={{ width: '100%', position: 'sticky', top: { xs: 0, sm: 0 }, zIndex: 1200 }}>
      <Alert severity="warning" sx={{ borderRadius: 0 }}>
        <Typography>
          {message}
        </Typography>
      </Alert>
    </Box>
  );
}