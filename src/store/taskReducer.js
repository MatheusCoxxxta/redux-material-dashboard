import api from '../services/api';
import { open } from './alertReducer'

const ACTIONS = {
  LIST: 'GET_TASKS',
  SAVE: 'SAVE_TASK',
  DELETE: 'DELETE_TASK',
  UPDATE: 'UPDATE_TASK'
};

const INITIAL_STATE = {
  tasks: [],
  qtd: 0
};

export const taskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.LIST:
      return { ...state, tasks: action.tasks, qtd: action.tasks.length };

    case ACTIONS.SAVE:
      const myTasks = [...state.tasks, action.task]
      return { ...state, tasks: myTasks, qtd: myTasks.length };

    case ACTIONS.DELETE:
      const id = action.id;
      const taskList = state.tasks.filter(task => task.id !== id);
      return { ...state, tasks: taskList, qtd: taskList.length };

    case ACTIONS.UPDATE:
      const allTasks = [...state.tasks];
      allTasks.forEach(task => {
        if (task.id === action.id) {
          task.done = true;
        }
      });
      return { ...state, tasks: allTasks };

    default:
      return state;
  }
};

export function list() {
  return dispach => {
    api
      .get('/tarefas', {
        headers: {
          'x-tenant-id': localStorage.getItem('@user:session-login')
        }
      })
      .then(response => {
        dispach({
          type: ACTIONS.LIST,
          tasks: response.data
        });
      });
  };
}

export function save(task) {
  return dispach => {
    api
      .post('/tarefas', task, {
        headers: {
          'x-tenant-id': localStorage.getItem('@user:session-login')
        }
      })
      .then(response => {
        dispach([{
          type: ACTIONS.SAVE,
          task: response.data
        }, open('A tarefa foi adicionada com sucesso!')]);
      });
  };
}

export function statusUpdate(id) {
  return dispach => {
    api
      .patch(`/tarefas/${id}`, null, {
        headers: {
          'x-tenant-id': localStorage.getItem('@user:session-login')
        }
      })
      .then(response => {
        dispach([{
          type: ACTIONS.UPDATE,
          id: id
        }, open('O status da tarefa foi atualizado com sucesso!')]);
      });
  };
}

export function destroy(id) {
  return dispach => {
    api
      .delete(`/tarefas/${id}`, {
        headers: {
          'x-tenant-id': localStorage.getItem('@user:session-login')
        }
      })
      .then(response => {
        dispach([{
          type: ACTIONS.DELETE,
          id: id
        }, open('A tarefa foi deletada com sucesso!')]);
      });
  };
}
