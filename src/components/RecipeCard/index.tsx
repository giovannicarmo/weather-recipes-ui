import { Chip, Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import clsx from 'clsx';
import React, { useMemo, useState } from 'react';
import { Recipe } from '../../interfaces/Recipe';
import useStyles from './styles';

const RecipeCard: React.FC<Recipe> = ({
  label,
  image,
  dietLabels,
  healthLabels,
  ingredientLines,
}) => {
  const styles = useStyles();

  const [expanded, setExpanded] = useState<boolean>(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const dietLabelList = useMemo(
    () =>
      dietLabels.length > 0 ? dietLabels.map((diet) => `${diet} `) : 'No diet',
    [dietLabels]
  );

  const healthLabelsList = useMemo(
    () =>
      healthLabels.length > 0 &&
      healthLabels.map((health) => (
        <Chip
          icon={<RestaurantIcon />}
          label={health}
          color="secondary"
          variant="outlined"
          className={styles.chip}
        />
      )),
    [healthLabels, styles.chip]
  );

  const ingredientList = useMemo(
    () =>
      ingredientLines.length > 0 &&
      ingredientLines.map((ingredient) => (
        <li>
          <Typography paragraph>{ingredient}</Typography>
        </li>
      )),
    [ingredientLines]
  );

  return (
    <Card className={styles.root}>
      <CardHeader
        title={
          <Typography variant="h6" title={label} className={styles.header}>
            {label}
          </Typography>
        }
        subheader={dietLabelList}
      />
      <CardMedia className={styles.media} image={image} title={label} />
      <CardContent className={styles.cardContent}>
        <Box display="flex" flexWrap="wrap">
          {healthLabelsList}
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(styles.expand, {
            [styles.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h6">Ingredients:</Typography>
          <ul>{ingredientList}</ul>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default RecipeCard;
