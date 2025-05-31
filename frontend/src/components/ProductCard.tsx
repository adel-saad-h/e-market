import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";

interface Props {
  _id: string;
  title: string;
  image: string;
  price: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ProductCard({ _id, title, image, price }: Props) {
  return (
    <Card sx={{bgcolor:"lightgrey"}}>
      <CardMedia
        component="img"
        sx={{ height: 200,minWidth:300,objectFit:"contain" ,pt:1}}
        src={image}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {price} EGP
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Button variant="contained" size="small">
          Add to card
        </Button>
      </CardActions>
    </Card>
  );
}
