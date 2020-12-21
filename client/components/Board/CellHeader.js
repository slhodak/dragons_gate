import React from 'react';
import '../../style.css';

export default (props) => {
  const { unit, coordinates } = props;
  return (
    <div className="cellHeader">
      <span className="cellName">{unit.name.substr(0, 1)}</span>
      <div className="hpStatus">
        <span>{unit.healthPoints}</span>
        <span className={`status ${unit.status}`}>{unit.status}</span>
      </div>
      <span className="coordinates">{coordinates}</span>
    </div>
  )
}