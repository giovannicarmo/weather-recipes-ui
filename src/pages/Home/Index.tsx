import React from 'react';
import Container from '@material-ui/core/Container';
import CityRecipes from '../../components/CityRecipes';
import Box from '@material-ui/core/Box';

const Home = () => {
  return (
    <Container fixed>
      <Box display="flex" flexDirection="column" justifyContent="center">
        <CityRecipes />
      </Box>
    </Container>
  );
};

export default Home;
