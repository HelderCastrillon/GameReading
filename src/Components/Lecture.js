import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import Transformer from 'react-transform-words'
import Popover from 'react-text-selection-popover';
import '../css/styleExtra.css'
import { Paper, Button } from '@material-ui/core';
import Note from './Note'
//firebase
import firebase from "firebase";
const style={
    content:{
            width:'60%',
            color:'white'
        }
        
}
const matchWords = [
    {
      word: 'se dejaba interesar lentamente por la trama, por el dibujo de los personajes. Esa', // can be a phrase
      action: 'click',
      className: "wonder-word", // set a custom css class
      caseSensitive: true,
      actionCallback: () => { console.log('clicked!!')} // captures action (on click)
    }
  ]
class Lecture extends React.Component{

    constructor(props){
        super(props)
        this.state={
            open:false,
            textSelected:"",
            user:{}
        }
    }

    getNotes=()=>{
        return firebase.database().ref('/notes/').once('value').then((Notes)=> {
            this.setState({Notes:Notes.val().notes});
        // ...
        });
      }

    componentDidMount(){
        document.addEventListener('mouseup', () => {
            let textSelected = window.getSelection().toString(); 
            if(textSelected.length>4)
                this.setState({open:true,textSelected})
          });
    }
    close=()=>{
        this.setState({open:false})
    }
    render(){
        const {title,summary,cover,text}=this.props.currentLecture;
        var line=0;
        return(
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
                            matchWords={matchWords} 
                            displayText= {value}
                            />
                        </p>
                    )
                })} 
            </Typography>

            <Note {...this.state} close={this.close} user={this.props.user}/>
        </div>  
                              
        )
    }
}
export default withTheme(style)(Lecture);