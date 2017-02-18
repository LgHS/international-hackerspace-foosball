/**
 * Select player screen
 */

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { togglePlayer } from '../actions';
import TeamList from '../components/teamList';
import Button from '../components/button';

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    togglePlayer: (player, index) => {
      dispatch(togglePlayer(player, index));
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
        <Link to="/" className="select__back">&laquo; back</Link>
        
        <div className="select__content">
          <TeamList
            onPlayerClick={(player) => this.props.togglePlayer(player, 0)}
            selected={this.props.game.team[0]}
            />

          <div className="select__vs">VS</div>
          
          <TeamList
            onPlayerClick={(player) => this.props.togglePlayer(player, 1)}
            selected={this.props.game.team[1]}
            />
        </div>

        {this.teamReady &&
          <Link to="/play" className="select__play">
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