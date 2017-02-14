 const defaultState = {
  //  players: [[], []],
   score: [0, 0],
  //  screen: 'INTRO'
 };

import { createStore } from 'redux'
import reducer from './reducers'
import { addScore, removeScore } from './actions';

let store = createStore(reducer);

console.log(store.getState());

store.subscribe(() =>
  console.log(store.getState())
)
console.log(addScore(0));

store.dispatch(addScore(0));
store.dispatch(addScore(0));
store.dispatch(addScore(1));
store.dispatch(removeScore(0));