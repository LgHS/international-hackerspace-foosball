import React from 'react';

export default (props) => {
  return (
    <div className="score">
      <div className="score__value">{ props.score }</div>
      <div className="score__team">{ props.team }</div>
    </div>
  )
}