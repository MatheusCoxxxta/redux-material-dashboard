import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { list, save, destroy, statusUpdate } from '../../store/taskReducer';
import { hide } from '../../store/alertReducer';

import { TasksToolbar, TaskTable } from './components';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const TaskList = props => {
  const classes = useStyles();

  useEffect(() => {
    props.list();
  }, []);

  return (
    <div className={classes.root}>
      <TasksToolbar save={props.save} />
      <div className={classes.content}>
        <TaskTable
          statusUpdate={props.statusUpdate}
          deleteTask={props.destroy}
          tasks={props.tasks}
        />
      </div>
      <Dialog open={props.openDialog} onClose={props.hide}>
        <DialogTitle>Atenção</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.hide}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => ({
  tasks: state.tasks.tasks,
  message: state.alert.message,
  openDialog: state.alert.dialog
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      list,
      save,
      destroy,
      statusUpdate,
      hide
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
