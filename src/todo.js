import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Button, Typography, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const todoStyles = theme => ({
  background: {
    backgroundColor: 'white'
  }
});

class _Todo extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.background}>
        <div>
          <Typography variant="h4">Todo</Typography>
          <Button>
            <AddIcon />
          </Button>
        </div>
      </div>
    );
  }
}

const Todo = withStyles(todoStyles)(_Todo);

export default Todo;
