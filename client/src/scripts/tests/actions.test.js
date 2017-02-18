import { addScore, removeScore, togglePlayer } from '../actions';

test('should create an action to add a score', () => {
  expect(addScore(1)).toEqual({
    index: 1,
    type: 'ADD_SCORE'
  });
});

test('should create an action to remove a score', () => {
  expect(removeScore(1)).toEqual({
    index: 1,
    type: 'REMOVE_SCORE'
  });
});

test('should creaste an action to toggle a player', () => {
  expect(togglePlayer({ name: 'Luigi'}, 1)).toEqual({
    player: {
      name: 'Luigi'
    },
    index: 1,
    type: 'TOGGLE_PLAYER'
  });
});