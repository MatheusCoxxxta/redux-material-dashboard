import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { TasksToolbar, TaskTable } from './components';

import axios from 'axios';
let api = axios;
const apiUrl = 'https://minhastarefas-api.herokuapp.com';
const email = 'matheus@email.com';
const headers = {
  'x-tenant-id': email
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const TaskList = () => {
  const classes = useStyles();

  const [tasks, setTasks] = useState([]);

  const save = (task) => {
    api
      .post(apiUrl + '/tarefas', task, {
        headers: headers
      })
      .then(response => {
        setTasks([...tasks, response.data]);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getTasks = () => {
    api
      .get(apiUrl + '/tarefas', {
        headers: headers
      })
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className={classes.root}>
      <TasksToolbar save={save} />
      <div className={classes.content}>
        <TaskTable tasks={tasks} />
      </div>
    </div>
  );
};

export default TaskList;
