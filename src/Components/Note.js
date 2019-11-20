import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
//firebase
import firebase from "firebase";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function AlertDialog(props) {
    const [note, setNote] = useState("");
    const [reference, setReference] = useState("");
    const [typeReference, settypeReference] = React.useState('photo');
    const months=["enero", "febrero", "marzo", "abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]
    const saveNote=(user,textSelected,note,reference)=>{
      // Get a reference to the database service
        var d = new Date(),
      month = (d.getMonth() + 1),
      day = d.getDate(),
      year = d.getFullYear(),
      hour= d.getHours(),
      minute = d.getMinutes(),
      seconds = d.getSeconds();
      if (month.length < 2) 
          month = '0' + month;
      if (day.length < 2) 
          day = '0' + day;
      var date = day+" de "+ months[month]+" del "+ year + ", a las "+[hour,minute,seconds].join(":");
      //var date=[year, month, day].join('/')+" "+[hour,minute,seconds].join(":");

      firebase.database().ref('/notes/'+d.getTime()).set({
          "user":{"displayName": user.displayName,
                  "email": user.email,
                  "photoURL":user.photoURL},
          "textSelected":textSelected,
          "typeReference":typeReference,
          "note":note,
          "reference":reference,
          "date": date
        }, (error)=> {
          if (error) {
            console.error(error)
          } else {
            props.close();
          }
        });
      }



  const handleClose = () => {
    props.close();
  };

  const handleTextBox=(e,key)=>{
    if(key=="note"){
        setNote(e.target.value)
    }
    else{
        setReference(e.target.value)
    }
  }
  const handleChange = event => {
    settypeReference(event.target.value);
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
            <IconButton
            aria-owns={open ? 'menu-appbar' : undefined}
            aria-haspopup="true"
            >
            <Avatar alt="Lector" src={props.user.photoURL} />

            </IconButton>
            {props.user.displayName + ", escribe tu comentario"}
            </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.textSelected}
          </DialogContentText>
          <br/>
          <TextField label="¿Lo has visto esto en algún lado?" onChange={(e)=>handleTextBox(e,"reference")} helperText="coloca aquí el link (ejemplo: http://www.mitos.....)" fullWidth/>
          <br/>
          <RadioGroup aria-label="position" name="position" value={typeReference} onChange={handleChange} row>
              <FormControlLabel
              value="photo"
              control={<Radio color="primary" />}
              label="Foto"
    
            />
            <FormControlLabel
              value="video"
              control={<Radio color="primary" />}
              label="video"
   
            />
          </RadioGroup>
          <br/>
          <TextField label="Escribe tu opinión" onChange={(e)=>handleTextBox(e,"note")} fullWidth   multiline  rows="4"  margin="normal" variant="filled"/>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ahora no
          </Button>
          <Button onClick={()=>saveNote(props.user,props.textSelected,note,reference)} color="primary" autoFocus>
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
