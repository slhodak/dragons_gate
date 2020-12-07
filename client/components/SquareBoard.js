import React from 'react';
import '../style.css';

export default (props) => {
  const { board } = props;
  return (
    board ? <div className="board">
      {board.map(row => {
        return <div className="squareRow">{row.map(cell => {
            return <div className="squareCell">{cell}</div>
        })}</div>
      })}
    </div> : <div>board not loaded</div>
  )
}
