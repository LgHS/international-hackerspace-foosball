export function addScore(index) {
  return {
    type: 'ADD_SCORE',
    index
  }
}

export function removeScore(index) {
  return {
    type: 'REMOVE_SCORE',
    index
  }
}

export function setPlayer(player, index) {
  return {
    type: 'SET_PLAYER',
    player,
    index
  }
}