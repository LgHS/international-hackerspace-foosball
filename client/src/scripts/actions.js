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

// export function setPlayer(player, index) {
//   return {
//     type: 'SET_PLAYER',
//     player,
//     index
//   }
// }

// export function removePlayer(player, index) {
//   return {
//     type: 'REMOVE_PLAYER',
//     player,
//     index
//   }
// }

export function togglePlayer(player, index) {
  return {
    type: 'TOGGLE_PLAYER',
    player,
    index
  }
}