import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function About(props) {
  const { classes } = props;

  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          Estrategia para la promoción de la lectoescritura
        </Typography>
        <Typography component="p">
            Narrativa digital y literatura hipertextual en los procesos de comprensión lectora de los estudiantes
            <pre>
            <strong>Investigadores Principales:</strong>
                <p>Helder Yesid Castrillón (hcastrillon@unicomfacauca.edu.co) - PhD Ingeniería telemática </p>
                <p>Angela Patricia Rodriguez (aurreste@unicomfacauca.edu.co)  - MG. Tecnologías aplicadas  la educación </p>  
                <p>Popayán 2020 </p>
                <p>Universidad Unicomfacauca</p>
                <p>Licencia MIT</p>
                <p><a href="https://github.com/HelderCastrillon/GameReading" target="_blank"> Código fuente</a></p>
                <div style={{textAlign:'center'}}>
                     <strong>Grupos de investigación:</strong>
                <br></br>
                <a href="http://www.unicomfacauca.edu.co/index.php/investigacion/grupos-de-investigacion/grupo-tic-unicomfacauca" target="_blank"><img src="http://www.unicomfacauca.edu.co/cache/mod_roksprocket/01fd3c28e20a9591fc5ae0e7ac32c16e_200_200.png"/></a>
                <a href="http://www.unicomfacauca.edu.co/index.php/investigacion/grupos-de-investigacion/grupo-comunicacion-para-la-ciudadania" target="_blank"><img src="http://www.unicomfacauca.edu.co/cache/mod_roksprocket/c6ab5525dd6e9e8544e0b798366e1ae0_200_200.png"/></a>
                </div>
            </pre>
        </Typography>
      </Paper>
    </div>
  );
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);
