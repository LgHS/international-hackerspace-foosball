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

export function togglePlayer(player, index) {
  return {
    type: 'TOGGLE_PLAYER',
    player,
    index
  }
}