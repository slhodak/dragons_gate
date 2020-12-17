import React from 'react';
import '../style.css';

export default (props) => {
  const { unit, coordinates } = props;
  return (
    <div className="cellHeader">
      {unit ? <span className="cellName">{unit.name.substr(0, 1)}</span> : <span></span>}
      {unit ? <span>{unit.healthPoints}</span> : <span></span>}
      <span className="coordinates">{coordinates}</span>
    </div>
  )
}