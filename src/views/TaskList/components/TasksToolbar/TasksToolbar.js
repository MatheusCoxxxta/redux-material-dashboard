import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core';

import { SearchInput } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const TasksToolbar = props => {
  const { className, ...rest } = props;

  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const task = {
      descricao: description,
      categoria: category
    }
    props.save(task)

    setDescription("")
    setCategory("")
  }

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <span className={classes.spacer} />
      </div>
      <div className={classes.row}>
        <Grid container>
          <Grid item md={6}>
            <TextField
              className={classes.searchInput}
              placeholder="Descrição da tarefa"
              label="Descrição"
              fullWidth
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Grid>

          <Grid item md={4}>
            <FormControl fullWidth>
              <InputLabel>Categorias:</InputLabel>
              <Select value={category} onChange={e => setCategory(e.target.value)}>
                <MenuItem value=""> Selecione... </MenuItem>
                <MenuItem value={'TRABALHO'}> Trabalho </MenuItem>
                <MenuItem value={'ESTUDOS'}> Estudos </MenuItem>
                <MenuItem value={'PESSOAL'}> Pessoal </MenuItem>
                <MenuItem value={'OUTROS'}> Outros </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item md={2}>
            <Button variant="contained" color="secondary"
              onClick={handleSubmit}>
              Adicionar
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

TasksToolbar.propTypes = {
  className: PropTypes.string
};

export default TasksToolbar;
