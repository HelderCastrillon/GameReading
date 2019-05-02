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
  title:{
    height:60,
    marginBottom:10
  },
  summary:{
    height:100
  },
  card: {
    maxWidth: 345,
    height:400,
    marginBottom:40
  },
  media: {
    height: 140,
  },
};

function MediaCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={props.cover}
          title={props.title}
        />
        <CardContent>
          <div className={classes.title}>
            <Typography gutterBottom variant="h5" component="h2">
            {props.title}
            </Typography>
          </div>
          <div className={classes.summary}>
          <Typography component="p">
          {props.summary.substring(0, 200)}
          </Typography>
          </div>
        </CardContent>
    
      <CardActions>
      <IconButton aria-label="Add to favorites" onClick={()=>props.likeLecture(props.bookid)} disabled={props.disabledlikes} color={props.liked.find(like=>{return like==props.bookid})==undefined?"default":"primary"} >
            <FavoriteIcon />
        </IconButton >
        <Button size="small" color="primary" onClick={()=>props.selectLecture(props)}>
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