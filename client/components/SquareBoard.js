import React from 'react';
import BoardCell from './BoardCell.js';
import '../style.css';

export default (props) => {
  const { board, startMovement, turnFaction } = props;
  return (
    board ? <div className="board">
      {board.map(row => {
        return <div className="squareRow">{row.map(cellData => {
          if (!cellData) {
            return <BoardCell />
          } else {
            const { id, name, faction } = cellData;
            const myTurn = faction === turnFaction.name;
            return <BoardCell  unitId={id} unitName={name} startMovement={startMovement} myTurn={myTurn} />
          }
        })}</div>
      })}
    </div> : <div>board not loaded</div>
  )
}
