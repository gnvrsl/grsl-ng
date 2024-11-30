import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';


interface BoardMemberBioProps {
  name: string,
  role: string,
  imageSrc: string,
  bio: string,
}

export default function BoardMemberBio({ name, role, imageSrc, bio }: BoardMemberBioProps) {

  return (
    <Card sx={{ maxWidth: '600px', width: '100%'}}>
      <CardMedia sx={{ height: '100%', minHeight: '400px' }} 
        image={imageSrc} title={name} />
      <CardContent>
        <Typography variant="h4" sx={{ color: 'primary' }}>
          {name}
        </Typography>
        <Typography variant="h5" sx={{ color: 'secondary' }}>
          {role}
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {bio}
        </Typography>
      </CardContent>
    </Card>
  )

}