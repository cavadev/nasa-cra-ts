import { Link } from "react-router-dom";

import { Asset } from '../interfaces';
import audioImg from '../assets/images/search-audio-small.png';

import { Card, CardMedia, Grid } from '@mui/material';


type AppProps = {
  items: Asset[];
};

const Collection = ({ items }: AppProps) => {
  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
      {items.map((asset, index) => {
        return (
          <Grid item xs={11} md={3} key={index}>
            <Link to={"/asset/" + asset.data[0].nasa_id}>
              <Card variant="outlined" data-testid="asset-card">
                <CardMedia
                  component="img"
                  height="194"
                  image={(asset.data[0].media_type === 'image' && asset.links) ? asset.links[0].href : audioImg}
                  alt="asset"
                />
              </Card>
            </Link>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default Collection

