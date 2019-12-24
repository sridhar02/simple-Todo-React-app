import React from 'react';
import './App.css';
import Todo from './todo.js';
import { withStyles } from '@material-ui/core/styles';

const appStyles = theme => ({
  container: {
    backgroundColor: 'black'
  }
});

function _App({classes}) {
  return (
    <div className={classes.container}>
      <Todo />
    </div>
  );
}

const App = withStyles(appStyles)(_App);

export default App;
