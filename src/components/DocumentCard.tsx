import {  
  Card, 
  CardContent, 
  Typography 
} from '@mui/material';


interface DocumentCardProps {
  title: string,
  url: string,
  imageSrc?: string,
}


export default function DocumentCard({ title, url, imageSrc }: DocumentCardProps) {
  return (
    <a href={url} target="_blank" style={{textDecoration: 'none'}}>
      <Card sx={{ width: 300, height: 300 }}>
        <CardContent>
          <Typography variant="h4">{title}</Typography>
          { imageSrc && <img src={imageSrc} alt={title} style={{ width: '100%' }} /> }
        </CardContent>
      </Card>
    </a>
  )
}