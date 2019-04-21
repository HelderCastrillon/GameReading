import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';


const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
};

function MediaCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/img/ejemplo.jpg"
          title="El rastro de tu sangre en la nieve"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          El rastro de tu sangre en la nieve
          </Typography>
          <Typography component="p">
          Al anochecer, cuando llegaron a la frontera, Nena Daconte se dio cuenta de que el dedo con el anillo de bodas le seguía sangrando. El guardia civil con una manta de lana cruda sobre el tricornio de charol examinó los pasaportes a la luz de una linterna de carburo, haciendo un grande esfuerzo para que no lo derribara la presión del viento que soplaba de los Pirineos. Aunque eran dos pasaportes diplomáticos en regla, el guardia levantó la linterna para comprobar que los retratos se parecían a las caras
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
        </IconButton>
        <Button size="small" color="primary" onClick={()=>props.selectLecture('lect-1')}>
          Leer!!
        </Button>
      </CardActions>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);