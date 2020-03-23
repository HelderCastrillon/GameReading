import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

function Favorites(props) {
    const { classes } = props;

    return (
        <div>
            <Paper className={classes.root} elevation={1}>
                <Typography variant="h5" component="h3">
                    Favoritos
        </Typography>
                <Typography component="p">
                   Hola {props.userName} aqui tienes la lista de tus lecturas favoritas
        </Typography>
                <ul>
                    {props.books.map((book) => {
                        if (props.likes.find(key => key == book.key) != undefined) {
                            return (
                                <li>
                                    {book.title + " de " + book.author}
                                    <Button size="small" color="primary" onClick={() => props.selectLecture(book)} disabled={props.disabledlikes}>
                                        Leer!!
                                    </Button>
                                </li>
                            )
                        }
                    })}
                </ul>
            </Paper>
        </div>
    );
}

Favorites.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Favorites);
