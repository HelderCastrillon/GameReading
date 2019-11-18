import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import Transformer from 'react-transform-words'
import '../css/styleExtra.css'
import Note from './Note'
//firebase
import firebase from "firebase";
import ViewNote from './ViewNote';
const style={
    content:{
            width:'60%',
            color:'white'
        }
        
}
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
                actionCallback: () => { console.log(note)} // captures action (on click)
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
    render(){
        const {title,summary,cover,text}=this.props.currentLecture;
        var line=0;
        return(
            <>
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
        <Note {...this.state} close={this.close} user={this.props.user}/>
         <div className="view-notes" ><ViewNote/></div>
         </>                     
        )
    }
}
export default withTheme(style)(Lecture);