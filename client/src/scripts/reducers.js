import { combineReducers } from 'redux';

function score(state = [0, 0], action) {
  if (action.type === 'ADD_SCORE') { 
    const newState = [...state];   
    newState[action.index] += 1;

    return newState;
  }

  if (action.type === 'REMOVE_SCORE') {
    const newState = [...state];
    newState[action.index] -= 1;

    return newState;
  }
  
  return state;
}

function team(state = [['Player1'], ['Player2']], action) {
  return state;
}

export default {
  score,
  team
};