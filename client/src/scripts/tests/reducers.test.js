import reducers from '../reducers';
import { addScore, removeScore, togglePlayer } from '../actions';

const reducer = reducers.game;

describe('game reducer', () => {
  it('should return the initial state', () => {
    const r = reducer(undefined, {});

    expect(r).toEqual({
      score: [0, 0],
      team: [
        [],
        []
      ],
      winner: false
    });
  });

  it('should handle addScore', () => {
    const r = reducer(undefined, addScore(1));

    expect(r).toEqual({
      score: [0, 1],
      team: [
        [],
        []
      ],
      winner: false
    })
  })
});