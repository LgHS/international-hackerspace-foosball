import { includes, pull } from 'lodash';

const defaultGame = {
  score: [0, 0],
  team: [
    [],
    []
  ],
  winner: false
};

const game = (state = defaultGame, action) => {
  let newState = {...state};

  if (action.type === 'TOGGLE_PLAYER') {
    const MAX_PLAYER_PER_TEAM = 2;
    const team = newState.team[action.index];
    const player = action.player;

    if (team.includes(player)) {
      // remove player
      pull(team, player);
    } else if (team.length < MAX_PLAYER_PER_TEAM) {
      // add player
      team.push(player);
    }
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