import { useState, ChangeEvent } from "react";

import NasaService from "../services/NasaService";
import { Asset, SearchFilters } from '../interfaces';
import Collection from "../components/Collection"

import { Box, Checkbox, CircularProgress, FormControlLabel, FormGroup } from '@mui/material';
import { Grid, Stack, TextField, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const SearchPage = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [filters, setFilters] = useState<SearchFilters>({images: true, audio: true});
  const [firstLoad, setFirstLoad] = useState(true);
  const [loading, setLoading] = useState(true);

  const handleChangeSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    setSearchText(searchText);
  };

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>, filter: string) => {
    setFilters({ ...filters, [filter]: event.target.checked });
  };

  function findByText() {
    setFirstLoad(false);
    NasaService.search(searchText, filters)
      .then((response: any) => {
        setAssets(response.data.collection.items);
        setLoading(false);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  return (
    <>
      <Grid mt={6} container direction="row" justifyContent="center" alignItems="center">
        <Grid item xs={12} md={12} >
          <Typography variant="h4" gutterBottom component="div">
            <Box sx={{ textAlign: 'center', m: 1 }}>
              Nasa Image and Audio Library
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={10} md={6} >
          <TextField
            fullWidth
            inputProps={{ "data-testid": "search-input" }}
            label="Search for..."
            variant="outlined" 
            value={searchText}
            onChange={handleChangeSearchText}
          />
        </Grid>
        <Grid item xs={2} md={1} >
          <IconButton data-testid="search-button" aria-label="search" onClick={findByText}>
            <SearchIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <Grid item xs={6} md={2}>
          <FormGroup>
            <FormControlLabel
              label="Images"
              control={
                <Checkbox
                  checked={filters.images}
                  onChange={e => handleFilterChange(e, 'images')}
                />
              }
            />
          </FormGroup>
        </Grid>
        <Grid item xs={6} md={2}>
          <FormGroup>
            <FormControlLabel
              label="Audio"
              control={
                <Checkbox
                  checked={filters.audio}
                  onChange={e => handleFilterChange(e, 'audio')}
                />
              }
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12} md={12}>
          {loading && !firstLoad && searchText !== '' && (
            <Stack mt={6} direction="row" justifyContent="center">
              <CircularProgress />
            </Stack>
          )}
          {!loading && assets.length > 0 && (
            <>
              <Typography variant="h5" gutterBottom component="div">
                <Box sx={{ textAlign: 'center', m: 1 }}>
                  Results
                </Box>
              </Typography>
              <Collection items={assets} />
            </>
          )}
          {!loading && !firstLoad && assets.length === 0 && (
            <Typography variant="h5" gutterBottom component="div">
              <Box sx={{ textAlign: 'center', m: 1 }}>
                No results, try other term
              </Box>
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default SearchPage;