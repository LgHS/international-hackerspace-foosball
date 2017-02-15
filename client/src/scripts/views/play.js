/**
 * Play screen
 */

import React from 'react';
import { connect } from 'react-redux';
import { addScore, removeScore } from '../actions';
import Score from '../components/score';
import Button from '../components/button';

const mapStateToProps = (state) => {
  state = state.game;

  return {
    ...state,
    team: [
      state.team[0].join(', '),
      state.team[1].join(', ')
    ]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addScore: (teamIndex) => {
      dispatch(addScore(teamIndex));
    },
    removeScore: (teamIndex) => {
      dispatch(removeScore(teamIndex));
    }
  }
};

class Play extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="play">
        {this.props.winner &&
          <p>game over!!</p>
        }
        <div>
          <Score score={ this.props.score[0] } team={ this.props.team[0] } />
          <Button label="Add point" onClick={() => this.props.addScore(0)} />
          <Button label="Remove point" onClick={() => this.props.removeScore(0)}/>
        </div>
        
        <div className="play__dash">&mdash;</div>

        <div>
          <Score score={ this.props.score[1] } team={ this.props.team[1]} />
          <Button label="Add point" onClick={() => this.props.addScore(1)} />
          <Button label="Remove point" onClick={() => this.props.removeScore(1) }/>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Play);