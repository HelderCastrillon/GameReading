
import {createMuiTheme} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import Logo from './Images/Logo.png'
const theme = createMuiTheme({
    typography: { useNextVariants: true },
    palette: {
      primary: { main: blue[700] }, // Purple and green play nicely together.
      secondary: { main: red[500] }, // This is just green.A700 as hex.
    },    
    styles:{        
        MainTitle:{

            color: 'white',
            backgroundImage: 'none',
            backgroundColor: 'transparent'
        },
        secondTitle:{

            color: 'white',
            paddingBottom:50
        },
        MainButton:{
            color: 'white'
        },
        backgroundLogo:{
            backgroundImage: "url("+Logo+")", 
            width: '100%', 
            height: '100%',
            backgroundRepeat:'no-repeat',
            backgroundPosition:'right center',
            bgproperties:'fixed'

        },
        ContentMain:{
            paddingLeft:300,
            paddingTop:80
        },
        darkStyleBackgroud:{
            background: 'linear-gradient(45deg, #424242 30%, #616161 90%)',
        },
        whiteStyleBackgroud:{
            background: 'linear-gradient(45deg, #e8eaf6 30%, #f5f5f5 90%)',

        },
        AppBar:{
            background: 'rgba(0,0,0,.0)',
            border: 0,
            height: 48,
            padding: '0 300px',
            boxShadow: '0 3px 5px 2px rgba(0,0,0,.0)',
        },
        forms: {
            minWidth: 350,
            maxWidth: 750,
        },
        formInput: {
            fontWeight: 100,
        },
        grow: {
            flexGrow: 1,
        },
    }
  });
 
  export default theme;
  