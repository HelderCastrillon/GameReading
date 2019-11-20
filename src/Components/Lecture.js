import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import Transformer from 'react-transform-words'
import '../css/styleExtra.css'
import Note from './Note'

//firebase
import firebase from "firebase";
import ViewNote from './ViewNote';
const style={
    content:{
            width:'90%',
            color:'white'
        }
        
}
class Lecture extends React.Component{

    constructor(props){
        super(props)
        this.state={
            open:false,
            textSelected:"",
            user:{},
            note:undefined
        }
    }

    getNotes=()=>{
        var starCountRef = firebase.database().ref('notes/');
        starCountRef.on('value', (snapshot)=> {
            this.setNotes(snapshot.val())
        });
      }
      setNotes=(rNotes)=>{
        var Notes=Object.values(rNotes).map(note=>{
            return({
                word: note.textSelected,
                action: 'click',
                className: "wonder-word", // set a custom css class
                caseSensitive: true,
                actionCallback: () => this.setState({note:note}) // captures action (on click)
            })
        })
 
        this.setState({Notes:Notes});
      }
    componentDidMount(){
        document.addEventListener('mouseup', () => {
            let textSelected = window.getSelection().toString(); 
            if(textSelected.length>4)
                this.setState({open:true,textSelected})
          });
        this.getNotes()
    }
    close=()=>{
        this.setState({open:false})
    }
    closeNote=()=>{
        this.setState({note:undefined})
    }
    render(){
        const {title,summary,cover,text}=this.props.currentLecture;
        var line=0;
        return(
            <>
            <Grid container spacing={3}>
                <Grid item xs={9}>
                <div style={style.content}>
                    <Typography variant="h4" gutterBottom color={this.props.color}>
                        {title} 
                    </Typography>
                    <Typography variant="body2" gutterBottom align="justify" color={this.props.color}>
                        
                        {text.map(value=>{
                            line++;
                            return(
                                <p>
                                    <Transformer key={line}
                                    matchWords={this.state.Notes} 
                                    displayText= {value}
                                    />
                                </p>
                            )
                        })} 
                    </Typography>
            
           
           
                 </div>  
                </Grid>
                    <Grid item xs={3} sm={3}>                    
                    <div className="view-notes" >{this.state.note==undefined?"":<ViewNote {...this.state.note} closeNote={this.closeNote} />}</div>
                    </Grid>
                </Grid>
                <Note {...this.state} close={this.close} user={this.props.user}/>
        
           
         </>                     
        )
    }
}
export default withTheme(style)(Lecture);