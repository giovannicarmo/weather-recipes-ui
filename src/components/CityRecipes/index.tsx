import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  Paper,
  makeStyles,
  TextField,
  Button,
  Box,
  CircularProgress,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { Recipe } from '../../interfaces/Recipe';
import { Weather } from '../../interfaces/Wheater';
import { api } from '../../services/api';
import ENDPOINTS from '../../constants/endpoins';
import RecipeCard from '../RecipeCard';

const flexColumn = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const useStyles = makeStyles(() => ({
  paper: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    minWidth: '45vw',
    padding: '30px 5%',
  },
  field: {
    flexBasis: '75%',
  },
  btn: {
    flexBasis: '20%',
    marginLeft: '5%',
  },
}));

const CityRecipes = () => {
  const styles = useStyles();

  const [city, setCity] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cityWeather, setCityWeather] = useState<Weather | undefined>(
    undefined
  );
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);

  const disabled = useMemo(() => city === '' || isLoading, [city, isLoading]);
  const endIcon = useMemo(
    () =>
      !isLoading ? (
        <SendIcon fontSize="small" />
      ) : (
        <CircularProgress size={14} />
      ),
    [isLoading]
  );

  const searchResults = useCallback(async () => {
    setIsLoading(true);
    await api
      .get(ENDPOINTS.GET(city))
      .then((res) => {
        const { weather, recipes } = res.data;
        setCityWeather(weather);
        setRecipeList(recipes);
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  }, [city, setIsLoading, setCityWeather, setRecipeList]);

  const RecipeCards = useMemo(
    () =>
      recipeList.length > 0 &&
      recipeList.map((recipe) => <RecipeCard {...recipe} />),
    [recipeList]
  );

  return (
    <Box {...flexColumn}>
      <Paper className={styles.paper}>
        <TextField
          id="city-name"
          label="Enter the city name"
          // defaultValue="Default Value"
          helperText="Please, enter an English-equivalent name (for example: London, New York)"
          variant="outlined"
          className={styles.field}
          onChange={(event) => setCity(event.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={styles.btn}
          onClick={searchResults}
          {...{ disabled, endIcon }}
        >
          Send
        </Button>
      </Paper>
      <Box display="flex" flexWrap="wrap" justifyContent="space-between">
        {RecipeCards}
      </Box>
    </Box>
  );
};

export default CityRecipes;
