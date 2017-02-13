/**
 * Intro game screen
 */

import React from 'react';
import Button from '../components/button';
import { Link } from 'react-router';

export default class Intro extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="intro">
        <h1>Hackerspace foosball</h1>
        <Link to="/play">
          <Button label="Start Game"></Button>
        </Link>

        <Button label="Create player"></Button>
      </div>
    )
  }
}