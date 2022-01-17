import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

import { AppBar, Box, Toolbar, Typography } from '@mui/material';

import SearchPage from './pages/Search'
import AssetPage from './pages/Asset';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Link to="/">
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Nasa
                </Typography>
              </Link>
            </Toolbar>
          </AppBar>
        </Box>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/asset/:id" element={<AssetPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
