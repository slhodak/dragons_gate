import React from 'react';
import Unit from './Unit.js';
import style from '../style.css';

export default (props) => (
  <div className={style.factions}>
    {`${Object.keys(props.factions).length} factions loaded`}
  </div>
);
