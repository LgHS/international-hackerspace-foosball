export function addScore(teamIndex) {
  return {
    type: 'ADD_SCORE',
    index: teamIndex
  }
}

export function removeScore(teamIndex) {
  return {
    type: 'REMOVE_SCORE',
    index: teamIndex
  }
}