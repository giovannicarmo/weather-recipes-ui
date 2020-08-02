import { makeStyles } from '@material-ui/core/styles';

const useStyles = () => {
  const rootW = '25vw';

  const styles = makeStyles((theme) => ({
    root: {
      width: rootW,
      margin: 20,
    },
    header: {
      whiteSpace: 'nowrap',
      width: `calc(${rootW} - 5vw)`,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    chip: {
      margin: 5,
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    cardContent: {
      paddingLeft: 20,
    },
  }));

  return styles();
};

export default useStyles;
