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

//Components
import theme from '../theme';
import CardLecture from './CardLecture'
import Lecture from './Lecture';
//import Book from '../data/stories.json';

//firebase
import firebase from "firebase";

class MainConcent extends React.Component {
   
        state = {
            auth: true,
            anchorEl: null,
            styleSelected:true,
            currentLecture:null,
            Book:[]
        };

      
        
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
        this.loginFacebook();
        this.setState({ anchorEl: null });
      };
      selectLecture(currentLecture){
        this.setState({currentLecture});
      }
  
      renderCards(){
        var Book=this.state.Book;
        if(Book.length>0)
            return Book.map(story=>{
                return(
                    <Grid item xs={3} key={"k"+story.key}>
                    <CardLecture {...story}  selectLecture={this.selectLecture.bind(this)}/>
                    </Grid>
                )
            });

      }
      loginFacebook(){
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      }
      initFirebase(){
                  // Initialize Firebase
        var config = {
            apiKey: "AIzaSyDcdo6A5ux_wNtafiEYB7A_0vxUxsRaxj8",
            authDomain: "gamereading.firebaseapp.com",
            databaseURL: "https://gamereading.firebaseio.com",
            projectId: "gamereading",
            storageBucket: "gamereading.appspot.com",
            messagingSenderId: "493040980527"
        };
        firebase.initializeApp(config);
      }
      getStories(){
        return firebase.database().ref('/stories').once('value').then((Stories)=> {
            this.setState({Book:Stories.val()});
        // ...
        });
      }
    componentDidMount(){
        this.initFirebase();  
        this.getStories();      
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
                                <Button color={this.state.styleSelected?"inherit":"default"}  onClick={()=>this.selectLecture(null)}>Lecturas</Button>
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
                    <Grid container  direction="row" justify="flex-start" alignItems="flex-start"  style={styles.ContentMain}>
                                {
                                    this.state.currentLecture==null?
                                    this.renderCards():
                                    <Grid item xs={12}><Lecture currentLecture={this.state.currentLecture} color={this.state.styleSelected?"inherit":"default"}/></Grid> 
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

