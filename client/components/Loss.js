import React from 'react';
import '../style.css';

export default (props) => {
  const { loss } = props;
  const active = loss > 0
  return (
    <span className={`loss ${active && 'disappearing'}`}>
      {active && ` -${loss}`}
    </span>
  )
}
