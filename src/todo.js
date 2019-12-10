import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Button, Typography, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const listStyles = theme => ({
  itemAlignment: {
    margin: theme.spacing(1),
    display: 'flex',
    justifyContent: 'flex-start',
    borderBottom: '1px solid grey'
  },
  radio: {
    width: '20px',
    marginTop: theme.spacing(1.2),
    border: '1px solid grey'
  },
  todoName: {
    margin: theme.spacing(1),
    color: 'white'
  }
});

function _List({ item, classes }) {
  return (
    <div className={classes.itemAlignment}>
      <input type="radio" className={classes.radio} />
      <Typography variant="body1" className={classes.todoName}>
        {item}
      </Typography>
    </div>
  );
}

const List = withStyles(listStyles)(_List);

const todoStyles = theme => ({
  container: {
    backgroundColor: 'black',
    padding: theme.spacing(2),
    height: '920px'
  },
  header: {
    color: 'yellow',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid grey',
    paddingBottom: theme.spacing(1)
  },
  input: {
    width: '100%',
    backgroundColor: 'black',
    color: 'white',
    padding: theme.spacing(2),
    borderRadius: '3px',
    border: 0,
    borderBottom: '1px solid grey',
    '&:hover': {
      border: 0,
      borderBottom: '1px solid grey'
    }
  },
  form: {
    color: 'white'
  },
  radio: {
    backgroundColor: 'white'
  },
  addButton: {
    backgroundColor: 'grey'
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
      <form onSubmit={this.handleSubmit} className={classes.form}>
        <input
          className={classes.input}
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
      <div className={classes.container}>
        <div className={classes.header}>
          <Typography variant="h4">Todo</Typography>
          <Button onClick={this.addItem} className={classes.addButton}>
            <AddIcon className={classes.addIcon} />
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
