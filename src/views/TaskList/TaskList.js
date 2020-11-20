import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import { TasksToolbar, TaskTable } from './components';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

import axios from 'axios';
let api = axios;
const apiUrl = 'https://minhastarefas-api.herokuapp.com';

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
  const [openDialog, setOpenDialog] = useState(false)
  const [messageTitle, setMessageTitle] = useState("Atenção")
  const [message, setMessage] = useState("")

  const getTasks = () => {
    api
      .get(`${apiUrl}/tarefas`, {
        headers: {
          'x-tenant-id': localStorage.getItem("@user:session-login")
        }
      })
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        setMessage('Ocorreu um erro ao tentar buscar tarefas...');
        setOpenDialog(true);
      });
  };

  const save = task => {
    api
      .post(apiUrl + '/tarefas', task, {
        headers: {
          'x-tenant-id': localStorage.getItem("@user:session-login")
        }
      })
      .then(response => {
        setTasks([...tasks, response.data]);
        setMessage('O item foi adicionado com sucesso!');
        setOpenDialog(true);
      })
      .catch(error => {
        setMessage('Ocorreu um erro ao tentar adicionar tarefa...');
        setOpenDialog(true);
      });
  };

  const statusUpdate = id => {
    api
      .patch(`${apiUrl}/tarefas/${id}`, null, {
        headers: {
          'x-tenant-id': localStorage.getItem("@user:session-login")
        }
      })
      .then(response => {
        const taskList = [...tasks];
        taskList.forEach(task => {
          if (task.id === id) {
            task.done = true;
          }
        });
        setTasks(taskList);
        setMessage('O item foi atualizado com sucesso!');
        setOpenDialog(true);
      })
      .catch(error => {
        setMessage('Ocorreu um erro ao tentar atualizar status tarefa...');
        setOpenDialog(true);
      });
  };

  const deleteTask = id => {
    api
      .delete(`${apiUrl}/tarefas/${id}`, {
        headers: {
          'x-tenant-id': localStorage.getItem("@user:session-login")
        }
      })
      .then(response => {
        const taskList = tasks.filter(task => task.id !== id);
        setTasks(taskList);
        setMessage('O item foi deletado com sucesso!');
        setOpenDialog(true);
      })
      .catch(error => {
        setMessage('Ocorreu um erro ao tentar deletar tarefa...');
        setOpenDialog(true);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className={classes.root}>
      <TasksToolbar save={save} />
      <div className={classes.content}>
        <TaskTable
          statusUpdate={statusUpdate}
          deleteTask={deleteTask}
          tasks={tasks}
        />
      </div>
      <Dialog open={openDialog} onClose={e => setOpenDialog(false)}>
        <DialogTitle>{messageTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={e => setOpenDialog(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TaskList;
