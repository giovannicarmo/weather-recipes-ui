import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import React, { useCallback, useMemo, useState } from 'react';
import ENDPOINTS from '../../constants/endpoins';
import Recipe from '../../interfaces/Recipe';
import Weather from '../../interfaces/Wheater';
import { api } from '../../services/api';
import RecipeCard from '../RecipeCard';
import useStyles from './styles';

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
    try {
      await api.get(ENDPOINTS.GET(city)).then((res) => {
        const { weather, recipes } = res.data;
        setCityWeather(weather);
        setRecipeList(recipes);
      });
    } catch (err) {
      console.log(err.response);
    }
    setIsLoading(false);
  }, [city, setIsLoading, setCityWeather, setRecipeList]);

  const CityCard = useMemo(
    () =>
      cityWeather && (
        <Paper className={styles.city}>
          <Typography variant="h6">{`${cityWeather.name}, ${cityWeather.country} - ${cityWeather.temp}°C`}</Typography>
        </Paper>
      ),
    [cityWeather, styles.city]
  );

  const RecipeCards = useMemo(
    () =>
      recipeList.length > 0 &&
      recipeList.map((recipe, index) => <RecipeCard key={index} {...recipe} />),
    [recipeList]
  );

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Paper className={styles.paper}>
        <TextField
          id="city-name"
          label="Enter the city name"
          // defaultValue="Default Value"
          helperText="Please, enter an English-equivalent name (for example: New York, London, Sao Paulo)"
          variant="outlined"
          className={styles.field}
          disabled={isLoading}
          onChange={(event) => setCity(event.target.value.trim())}
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
      {CityCard}
      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        alignItems="baseline"
      >
        {RecipeCards}
      </Box>
    </Box>
  );
};

export default CityRecipes;
