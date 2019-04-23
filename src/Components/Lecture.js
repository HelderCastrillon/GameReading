import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import Transformer from 'react-transform-words'
import Popover from 'react-text-selection-popover';
import styleExtra from '../css/styleExtra.css'

const style={
    content:{
            width:'60%',
            color:'white'
        },
        
}
const matchWords = [
    {
      word: 'que más allá', // can be a phrase
      action: 'click',
      className: "clicky-word", // set a custom css class
      caseSensitive: true,
      actionCallback: () => { console.log('clicked!!') } // captures action (on click)
    }
  ]
class Lecture extends React.Component{

    constructor(props){
        super(props)
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
                            <Transformer key={line} ref={this.refLecture}
                            matchWords={matchWords} 
                            displayText= {value}
                            />
                        </p>
                    )
                })}
                

            
            </Typography>
        
            <Popover
             onTextSelect={() => this.setState({ isOpen: true })}
             selectionRef={this.refLecture}
             >Hello there</Popover>
        </div>                        
        )
    }
}
export default withTheme(style)(Lecture);