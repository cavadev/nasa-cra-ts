import { MouseEvent, useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { AxiosResponse } from "axios";

import NasaService from "../services/NasaService";
import { Manifest, MetadataLocation, MetadataDetails } from "../interfaces";
import audioImg from '../assets/images/search-audio-medium.png';

import { Box, Button, Card, CardMedia, CircularProgress, Grid, Stack, Typography } from '@mui/material';

interface AssetDetail {
  mediaType: string,
  title: string,
  shortDescription: string,
  longDescription: string,
  images: {href: string; }[],
}

const AssetPage = () => {
  const { id: assetId} = useParams();
  const [loading, setLoading] = useState(true);
  const [showLongDescription, setShowLongDescription] = useState(false);
  const [currentAsset, setCurrentAsset] = useState<AssetDetail>({
    mediaType: '',
    title: '',
    shortDescription: '',
    longDescription: '',
    images: [{ href: '' }],
  });

  let maxShortDescription: number = 300;
  
  const getAsset = () => {
    if (assetId) {
      NasaService.getMetadataLocation(assetId)
        .then((response: AxiosResponse<MetadataLocation>) => {
          return NasaService.getMetadataDetails(response.data.location);
        })
        .then((metadata: AxiosResponse<MetadataDetails>) => {
          maxShortDescription = Math.min(maxShortDescription, metadata.data['AVAIL:Description'].length);
          setCurrentAsset(prevState => {
            return {...prevState, 
            mediaType: metadata.data['AVAIL:MediaType'],
            title: metadata.data['AVAIL:Title'],
            shortDescription: metadata.data['AVAIL:Description'].slice(0, maxShortDescription),
            longDescription: metadata.data['AVAIL:Description'],
          }});
          return NasaService.getManifest(assetId);
        })
        .then((manifest: AxiosResponse<Manifest>) => {
          setCurrentAsset(prevState => {
            return {...prevState, images: manifest.data.collection.items
          }});
          setLoading(false);  
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  };

  useEffect(() => {
    getAsset();
  }, []);

  const handleShowLongDescription = (e: MouseEvent<HTMLElement>) => {
    setShowLongDescription(!showLongDescription);
  };

  return (
    <>
      {loading && (
        <Stack mt={6} direction="row" justifyContent="center">
          <CircularProgress />
        </Stack>
      )}
      {!loading && currentAsset.mediaType !== '' && (
        <Grid mt={6} container direction="row" justifyContent="center" alignItems="center">
          <Grid item xs={12} md={10} >
            <Typography variant="h4" gutterBottom component="div">
              <Box sx={{ textAlign: 'center', m: 1 }}>
                {currentAsset && currentAsset.title}
              </Box>
            </Typography>
            {!showLongDescription && (
              <Typography variant="body1" gutterBottom component="div">
                <Box sx={{ textAlign: 'center', m: 1 }}>
                  {currentAsset && currentAsset.shortDescription}
                  {currentAsset.shortDescription.length !== currentAsset.longDescription.length && (
                    <Button variant="text" onClick={handleShowLongDescription}>...show more</Button>
                  )}
                </Box>
              </Typography>
            )}
            {showLongDescription && (
              <Typography variant="body1" gutterBottom component="div">
                <Box sx={{ textAlign: 'center', m: 1 }}>
                  {currentAsset && currentAsset.longDescription}
                  <Button variant="text" onClick={handleShowLongDescription}>...show less</Button>
                </Box>
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} md={10} >
            <Card variant="outlined" >
              <CardMedia
                component="img"
                height="400"
                image={currentAsset.mediaType === 'image' ? currentAsset.images[0].href : audioImg}
                alt="asset"
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={10} >
            <Link to={"/"}>
              <Button variant="text">← Back to home</Button>
            </Link>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default AssetPage;
