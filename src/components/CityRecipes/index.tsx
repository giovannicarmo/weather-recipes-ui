import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import ENDPOINTS from '../../constants/endpoins';
import { formatToSend } from '../../functions/utils';
import DialogRef from '../../interfaces/DialogRef';
import ErrResponse from '../../interfaces/ErrResponse';
import Recipe from '../../interfaces/Recipe';
import Weather from '../../interfaces/Wheater';
import { api } from '../../services/api';
import RecipeCard from '../RecipeCard';
import ErrorDialog from './../ErrorDialog';
import useStyles from './styles';

const CityRecipes = () => {
  const styles = useStyles();
  const dialog = useRef<DialogRef>(null);

  const [city, setCity] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cityWeather, setCityWeather] = useState<Weather | undefined>(
    undefined
  );
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const [errResponse, setErrResponse] = useState<ErrResponse | undefined>(
    undefined
  );

  const Dialog = useMemo(
    () => errResponse && <ErrorDialog ref={dialog} {...errResponse} />,
    [errResponse]
  );

  const showErr = useCallback(() => dialog.current?.show(), [dialog]);

  const searchResults = useCallback(async () => {
    setIsLoading(true);
    const query = formatToSend(city);
    try {
      await api.get(ENDPOINTS.GET(query)).then((res) => {
        const { weather, recipes } = res.data;
        weather && setCityWeather(weather);
        recipes && setRecipeList(recipes);
      });
    } catch (err) {
      const { data, status, statusText } = err.response;
      setErrResponse({ data, status, statusText });
      showErr();
    }
    setIsLoading(false);
  }, [city, setIsLoading, setCityWeather, setRecipeList, showErr]);

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
    <>
      {Dialog}
      <Box display="flex" flexDirection="column" alignItems="center">
        <Paper className={styles.paper}>
          <TextField
            label="Enter the city name"
            defaultValue={city}
            helperText="Please, enter an English-equivalent name (for example: New York, London)"
            variant="outlined"
            className={styles.field}
            disabled={isLoading}
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
    </>
  );
};

export default CityRecipes;
