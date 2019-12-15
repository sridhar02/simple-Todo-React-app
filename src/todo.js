import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Radio from '@material-ui/core/Radio';

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
      borderColor: 'white',
      backgroundColor: 'grey'
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

function _List({ item, classes }) {
  return (
    <div className={classes.itemAlignment}>
      <Radio type="radio" className={classes.radio} />
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
    fontSize: '15px',
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
    backgroundColor: 'grey',
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
        todoList: [...this.state.todoList, this.state.item],
        added: false
      });
    }
  };

  componentDidMount() {
    const list = localStorage.getItem('list');
    const parsedList = JSON.parse(list);
    console.log(parsedList);
    if (list == null) {
      return false;
    } else {
      this.setState({
        todoList: parsedList
      });
    }
  }

  componentDidUpdate() {
    const { todoList } = this.state;
    localStorage.setItem('list', JSON.stringify(todoList));
  }

  addItem = event => {
    this.setState({
      added: true
    });
  };

  render() {
    const { classes } = this.props;
    const { todoList, added } = this.state;
    const addItem = added ? (
      <input
        onKeyDown={this.handleSubmit}
        className={classes.input}
        value={this.state.item}
        onChange={this.handleChange}
      />
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
