import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Radio from '@material-ui/core/Radio';
import Snackbar from '@material-ui/core/Snackbar';

const listStyles = theme => ({
  itemAlignment: {
    margin: theme.spacing(1),
    display: 'flex',
    justifyContent: 'flex-start'
  },
  radio: {
    borderColor: 'white',
    color: 'white',
    '&:hover': {
      color: 'white',
      borderColor: 'white'
    }
  },
  todoName: {
    margin: theme.spacing(0.5),
    color: 'white',
    width: '100%',
    borderBottom: '1px solid grey',
    display: 'flex',
    justifyContent: 'flex-start'
  }
});

class _List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      vertical: 'top',
      horizontal: 'center'
    };
  }

  taskCompleted = item => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };
  render() {
    const { item, classes } = this.props;
    const { vertical, horizontal, open } = this.state;
    return (
      <div className={classes.itemAlignment}>
        <Radio
          type="radio"
          className={classes.radio}
          color="primary"
          onChange={() => this.taskCompleted(item)}
        />
        <Typography variant="body1" className={classes.todoName}>
          {item}
        </Typography>
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          key={`${vertical},${horizontal}`}
          autoHideDuration={1000}
          open={open}
          onClose={this.handleClose}
          message={<span>Task Completed</span>}
        />
      </div>
    );
  }
}

const List = withStyles(listStyles)(_List);

const todoStyles = theme => ({
  container: {
    backgroundColor: 'black',
    padding: theme.spacing(2)
  },
  header: {
    color: 'yellow',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid grey',
    paddingBottom: theme.spacing(1)
  },
  input: {
    width: '98%',
    fontSize: '15px',
    backgroundColor: 'white',
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
    borderRadius: '5px',
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
    color: 'white',
    padding: theme.spacing(1),
    '&:hover': {
      color: 'white',
      backgroundColor: 'grey'
    }
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
    if (event.keyCode === 13) {
      event.preventDefault();
      this.setState({
        item: '',
        todoList: [...this.state.todoList, this.state.item]
      });
    }
  };

  fetchItems = () => {
    const list = localStorage.getItem('list');
    const parsedList = JSON.parse(list);
    if (list == null) {
      return false;
    } else {
      this.setState({
        todoList: parsedList
      });
    }
  };

  componentDidMount() {
    this.fetchItems();
  }

  componentDidUpdate() {
    const { todoList } = this.state;
    localStorage.setItem('list', JSON.stringify(todoList));
  }

  render() {
    const { classes } = this.props;
    const { todoList } = this.state;
    return (
      <div className={classes.container}>
        <div className={classes.header}>
          <Typography variant="h4">Todo</Typography>
          <Button className={classes.addButton}>
            <AddIcon className={classes.addIcon} />
          </Button>
        </div>
        <input
          onKeyDown={this.handleSubmit}
          className={classes.input}
          value={this.state.item}
          onChange={this.handleChange}
          autoFocus
        />

        {todoList.map(item => (
          <List key={item} item={item} />
        ))}
      </div>
    );
  }
}

const Todo = withStyles(todoStyles)(_Todo);

export default Todo;
