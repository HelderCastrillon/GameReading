import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import Cancel from '@material-ui/icons/Cancel';
import ReactPlayer from 'react-player'
const styles = theme => ({
  card: {
    maxWidth: 300,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
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
  avatar: {
    backgroundColor: red[500],
  },
});

class ViewNote extends React.Component {
  state = { expanded: false,render:true };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar alt="Lector" src={this.props.user.photoURL} />
          }
          action={
            <IconButton>
              <Cancel onClick={()=>this.props.closeNote()} />
            </IconButton>
          }
          title={this.props.user.displayName}
          subheader={this.props.date}
        />
        {this.props.typeReference=="photo"?
        <CardMedia
          className={classes.media}
          image={this.props.reference}
          title="Paella dish"
        />:
        <ReactPlayer width="100%" height ="100%" url={this.props.reference} playing />}
        <CardContent>
          <Typography component="p">
           {this.props.note}
          </Typography>
        </CardContent>
      </Card>
    );
  }

}

ViewNote.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ViewNote);
