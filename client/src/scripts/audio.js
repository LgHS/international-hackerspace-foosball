require('file-loader?name=[name].[ext]!../audio/1.mp3');
require('file-loader?name=[name].[ext]!../audio/2.mp3');

import { cloneDeep, forEach, random } from 'lodash';
import { Howl } from 'howler';

import store from './store';
// const url = require('../audio/1.mp3');

class Audio {
  constructor() {
    this.prevState = store.getState();
    this.createAudiosInstances();

    this.bind();
  }

  createAudiosInstances() {
    this.audios = {
      'score': []
    };

    forEach(['/1.mp3', '/2.mp3'], (file) => {
      const howl = new Howl({
        src: [file]
      });

      this.audios.score.push(howl);
    });
  }

  /**
   * Calculate the total score from a state
   */
  totalScore(state) {
    return state.game.score[0] + state.game.score[1];
  }

  bind() {
    this.onStateChange = this.onStateChange.bind(this);
    store.subscribe(this.onStateChange);
  }

  onStateChange() {
    const nextState = store.getState();
    const oldScore = this.totalScore(this.prevState);
    const newScore = this.totalScore(nextState);

    if (newScore > oldScore) {
      this.playScore();
    }

    this.prevState = cloneDeep(nextState);
  }

  playScore() {
    const pool = this.audios.score;
    const index = random(0, this.audios.score.length - 1);

    pool[index].play();
  }
}

export default new Audio();