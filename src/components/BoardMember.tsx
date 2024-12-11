import {
  Avatar,
  Box,
  Link,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface BoardMemberProps {
  name: string,
  role: string,
  imageSrc: string,
}

export default function BoardMember({ name, role, imageSrc }: BoardMemberProps) {

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      pb: 4 }}>
      <Avatar sx={{ width: 260, height: 260 }} src={imageSrc} alt={name} />
      <Link component={RouterLink} 
        sx={{ typography: 'h4', color: 'secondary.contrastText' }}
        to={'/board#' + name}>
        {name}
      </Link>
      <Typography variant="h5" sx={{ color: 'secondary.contrastText' }}>
        {role}
      </Typography>
    </Box>
  )

}