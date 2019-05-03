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
import Avatar from '@material-ui/core/Avatar';
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
            Book:[],
            likes:[],
            userAccount:null
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
                    <Grid item xs={6} sm={3} style={theme.cardGrid} key={"k"+story.key}>
                    <CardLecture {...story} bookid={story.key} likeLecture={this.setLike.bind(this)} selectLecture={this.selectLecture.bind(this)} liked={this.state.likes} disabledlikes={this.state.userAccount==null?true:false}/>
                    </Grid>
                )
            });

      }
      loginFacebook(){
        this.setState({anchorEl: null});
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result)=> {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var userAccount = result.user;
            this.setState({userAccount,anchorEl: null});
            this.getLikes(userAccount.uid)
            // ...
          }).catch((error)=> {
            console.warn(error)
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            this.setState({userAccount:null,anchorEl: null});
          });
      }
      logOut(){
        this.setState({ anchorEl: null,userAccount:null });
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
      getLikes(userId){
        return firebase.database().ref('/likes/'+userId).once('value').then((Stories)=> {
            this.setState({likes:Stories.val().book});
        // ...
        });
      }
      setLike(bookid){
        let booksLikes=this.state.likes
        let userId=this.state.userAccount.uid
        if (booksLikes.find(book=>{return book==bookid})==bookid)
            booksLikes= booksLikes.filter(book=>{return book!=bookid})
        else
            booksLikes.push(bookid)

        firebase.database().ref('/likes/'+userId).set({
          "book": booksLikes
        }, (error)=> {
          if (error) {
            console.error(error)
          } else {
            this.setState({likes:booksLikes});
          }
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
                <Grid container spacing={8} style={this.state.styleSelected?styles.darkStyleBackgroud:styles.whiteStyleBackgroud} >
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
                                    {this.state.userAccount==null?<AccountCircle />:<Avatar alt="Lector" src={this.state.userAccount.photoURL} />}
                                    
                                    </IconButton>
                                    {
                                      this.state.userAccount==null?
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
                                    
                                      <MenuItem onClick={this.loginFacebook.bind(this)}>Iniciar Sesión</MenuItem>
                                                                 
                                    </Menu>
                                    :
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
                                    <MenuItem disabled={true}> {this.state.userAccount.displayName}</MenuItem>
                                      <MenuItem onClick={this.handleClose.bind(this)}>Favoritos</MenuItem>
                                      <MenuItem onClick={this.logOut.bind(this)}>Salir</MenuItem>
                                      </Menu>
                                    }
                                </div>
                                )}
                            </Toolbar>
                        </AppBar>
                    </Grid>
                    <div style={{flexGrow: 1}}></div>
                    <Grid container spacing={24}  direction="row" justify="flex-start" alignItems="flex-start"  style={styles.ContentMain}>
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

