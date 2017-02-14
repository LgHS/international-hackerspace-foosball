import React from 'react';

export default (props) => {
  return (
    <button onClick={props.onClick}>{props.label}</button>
  )
}