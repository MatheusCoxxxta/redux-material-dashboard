export const ACTIONS = {
  OPEN: 'OPEN_DIALOG',
  HIDE: 'HIDE_DIALOG'
};

const INITIAL_STATE = {
  dialog: false,
  message: ''
};

export const alertReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTIONS.OPEN:
      return { ...state, message: action.message, dialog: true };
    case ACTIONS.HIDE:
      return { ...state, message: '', dialog: false };

    default:
      return state;
  }
};

export function open(message) {
  return dispatch => {
    dispatch({
      type: ACTIONS.OPEN,
      message: message
    });
  };
}

export function hide() {
  return dispatch => {
    dispatch({
      type: ACTIONS.HIDE
    });
  };
}
