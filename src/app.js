//React Library
import React from 'react';
import ReactDOM from 'react-dom';
//Materials Components
import { MuiThemeProvider } from '@material-ui/core/styles';
import MainConcent from './Components/MainContent';
//My Components
import theme from './theme';

function App() {
  return (
    <>
      <MuiThemeProvider theme={theme}>
       <MainConcent/>
      </MuiThemeProvider>
    </>
  )
}

ReactDOM.render(<App/>, document.querySelector('#app'));