import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Logo from '../Images/Logo.png'
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import Switch from '@material-ui/core/Switch';
import theme from '../theme';
import CardLecture from './CardLecture'
import Lecture from './Lecture';
import Book from '../data/stories.json';
class MainConcent extends React.Component {
    constructor(props){
        super(props);    
        this.state = {
            auth: true,
            anchorEl: null,
            styleSelected:true,
            currentLecture:null
        };
        }
      handleChange(event){
        this.setState({ auth: event.target.checked });
      };
      handleChangeStyle(event){
        this.setState({ styleSelected: event.target.checked });
      };
    
      handleMenu(event){
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose(){
        this.setState({ anchorEl: null });
      };
      selectLecture(currentLecture){
        this.setState({currentLecture});
      }
  
      renderCards(){
        return Book.stories.map(story=>{
            return(
                <CardLecture {...story}  selectLecture={this.selectLecture.bind(this)}/>
            )
        });

      }
    
    render(){
        const {styles}=theme;
    const open = Boolean(this.state.anchorEl);
    return (
       
        <>
            <Grid container spacing={24} style={this.state.styleSelected?styles.darkStyleBackgroud:styles.whiteStyleBackgroud} >
                <Grid item xs={12}>
                    <AppBar position="static" style={styles.AppBar}>
                        <Toolbar>
                             <img src={Logo}/>
                            <Typography variant="h4" color={this.state.styleSelected?"inherit":"default"} style={styles.grow}>
                             Esto lo he visto en algún lado
                            </Typography>
                            <Button color={this.state.styleSelected?"inherit":"default"}>Lecturas</Button>
                            <Button color={this.state.styleSelected?"inherit":"default"}>Acerca del proyecto</Button>
                            <Switch
                                checked={this.state.styleSelected}
                                onChange={this.handleChangeStyle.bind(this)}
                                value="styleSelected"
                                color="default"
                            />
                            {this.state.auth && (
                            <div>
                                <IconButton
                                aria-owns={open ? 'menu-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleMenu.bind(this)}
                                color={this.state.styleSelected?"inherit":"default"}
                                >
                                <AccountCircle />
                                </IconButton>
                                <Menu
                                id="menu-appbar"
                                anchorEl={this.state.anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.handleClose.bind(this)}
                                >
                                <MenuItem onClick={this.handleClose.bind(this)}>Favoritos</MenuItem>
                                <MenuItem onClick={this.handleClose.bind(this)}>Salir</MenuItem>
                                </Menu>
                            </div>
                            )}
                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid item xs={12} style={styles.ContentMain}>
                            {
                                this.state.currentLecture==null?
                                this.renderCards():
                                <Lecture currentLecture={this.state.currentLecture} color={this.state.styleSelected?"inherit":"default"}/> 
                            }
                </Grid>
                <Grid item xs={12}>
                  
                </Grid>
            </Grid>
        </>
    )
}
}
export default withTheme()(MainConcent)

