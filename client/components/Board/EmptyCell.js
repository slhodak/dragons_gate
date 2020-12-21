import React from 'react';
import '../../style.css';

export default (props) => {
  const {
    isValidMove,
    moveMoverTo,
    coordinates
  } = props;
  return (
    <div  className={`${isValidMove ? 'isValidMove' : ''}`}
          onClick={isValidMove ? () => moveMoverTo(coordinates) : null}>
      <span className="coordinates">{coordinates}</span>
    </div>
  )
}
