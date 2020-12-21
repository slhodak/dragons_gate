import React from 'react';
import '../style.css';

export default (props) => {
  const { unit, coordinates } = props;
  return (
    <div className="cellHeader">
      {unit ? <span className="cellName">{unit.name.substr(0, 1)}</span> : <span></span>}
      {unit ?
        <div className="hpStatus">
          <span>{unit.healthPoints}</span>
          <span className={`status ${unit.status}`}>{unit.status}</span>
        </div>
        : null}
      <span className="coordinates">{coordinates}</span>
    </div>
  )
}