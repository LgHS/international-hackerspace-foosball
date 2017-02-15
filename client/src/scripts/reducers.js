const defaultGame = {
  score: [0, 0],
  team: [
    ['Player1'],
    ['Player2']
  ],
  winner: false
};

const game = (state = defaultGame, action) => {
  let newState = {...state};

  if (action.type === 'ADD_SCORE') {
    newState.score[action.index] += 1;
  }

  if (action.type === 'REMOVE_SCORE') {
    newState.score[action.index] -= 1;
    newState.score[action.index] = Math.max(0, newState.score[action.index]);
  }

  newState.winner = newState.score[0] > 9;

  return newState;
};

export default {
  game
};