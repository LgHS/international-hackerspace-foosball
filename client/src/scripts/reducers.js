const defaultGame = {
  score: [0, 0],
  team: [
    [],
    []
  ],
  winner: false
};

const MAX_PLAYER_PER_TEAM = 2;

const game = (state = defaultGame, action) => {
  let newState = {...state};

  if (action.type === 'SET_PLAYER') {
    const team = newState.team[action.index];
    team.push(action.player);
  }

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