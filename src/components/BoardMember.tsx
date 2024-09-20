import {
  Avatar,
  Box,
  Typography,
} from '@mui/material';


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
      <Typography variant="h4" sx={{ color: 'secondary.contrastText' }}>
        {name}
      </Typography>
      <Typography variant="h5" sx={{ color: 'secondary.contrastText' }}>
        {role}
      </Typography>
    </Box>
  )

}