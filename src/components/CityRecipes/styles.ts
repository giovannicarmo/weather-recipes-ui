import { makeStyles } from '@material-ui/core/styles';

const useStyles = () => {
  const styles = makeStyles(() => ({
    paper: {
      display: 'flex',
      justifyContent: 'flex-end',
      flexWrap: 'wrap',
      alignItems: 'baseline',
      minWidth: '45vw',
      marginTop: 50,
      padding: '30px 5%',
    },
    field: {
      flexBasis: '75%',
    },
    btn: {
      flexBasis: '20%',
      marginLeft: '5%',
    },
    city: {
      margin: '20px 0 0 0',
      padding: 10,
      color: '#2980b9',
    },
  }));

  return styles();
};

export default useStyles;
