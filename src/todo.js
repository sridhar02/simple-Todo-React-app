import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Button, Typography, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Radio from '@material-ui/core/Radio';

const listStyles = theme => ({
  itemAlignment: {
    margin: theme.spacing(1),
    display: 'flex',
    justifyContent: 'flex-start',
    borderBottom: '1px solid #ddd'
  },
  radio: {
    width: '20px'
  },
  todoName: {
    marginTop: theme.spacing(1.2)
  }
});

function _List({ item, classes }) {
  return (
    <div className={classes.itemAlignment}>
      <Radio className={classes.radio} />
      <Typography variant="body2" className={classes.todoName}>
        {item}
      </Typography>
    </div>
  );
}

const List = withStyles(listStyles)(_List);

const todoStyles = theme => ({
  background: {
    backgroundColor: 'white'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #ddd'
  },
  texfield: {
    width: '90%'
  }
});

class _Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: '',
      todoList: [],
      added: false
    };
  }

  handleChange = event => {
    this.setState({
      item: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      item: '',
      todoList: [...this.state.todoList, this.state.item],
      added: false
    });
  };

  addItem = event => {
    this.setState({
      added: true
    });
  };

  render() {
    const { classes } = this.props;
    const { item, todoList, added } = this.state;
    console.log(item, todoList);
    const addItem = added ? (
      <form onSubmit={this.handleSubmit}>
        <Radio />
        <TextField
          className={classes.texfield}
          id="standard-basic"
          value={this.state.item}
          onChange={this.handleChange}
        />
        <Button type="submit" hidden></Button>
      </form>
    ) : (
      <div></div>
    );
    return (
      <div className={classes.background}>
        <div className={classes.header}>
          <Typography variant="h4">Todo</Typography>
          <Button onClick={this.addItem}>
            <AddIcon />
          </Button>
        </div>
        {addItem}
        {todoList.map(item => (
          <List key={item} item={item} />
        ))}
      </div>
    );
  }
}

const Todo = withStyles(todoStyles)(_Todo);

export default Todo;
