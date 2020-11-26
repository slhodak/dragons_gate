import React from 'react';
import Unit from './Unit.js';
import style from '../style.css';

export default (props) => {
  const { faction, name } = props;
  return (
    <div className={style.faction}>
      <h2>{name}</h2>
      {faction.units.map(unit => <Unit unit={unit} />)}
    </div>
  )
};
