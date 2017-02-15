/**
 * Select player screen
 */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { setPlayer } from '../actions';
import TeamList from '../components/teamList';
import Button from '../components/button';

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setPlayer: (player, index) => {
      dispatch(setPlayer(player, index));
    }
  }
};

class Select extends React.Component {
  constructor(props) {
    super(props);
  }

  get teamReady() {
    return !!this.props.game.team[0].length && !!this.props.game.team[1].length;
  }

  render() {
    return (
      <div className="select">
        <Link to="/">Back</Link>
        Select players!

        <TeamList
          onSelect={(player) => this.props.setPlayer(player, 0)}
          selected={this.props.game.team[0]}
          />
        
        <TeamList
          onSelect={(player) => this.props.setPlayer(player, 1)}
          selected={this.props.game.team[1]}
          />

        {this.teamReady &&
          <Link to="/play">
            <Button label="Play"></Button>
          </Link>
        }
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Select);