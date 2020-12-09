import React from 'react';
import BoardCell from './BoardCell.js';
import '../style.css';

export default (props) => {
  const {
    board,
    setMover,
    turnFaction,
    moverCanMoveTo,
    mover,
    moveMoverTo
  } = props;
  return (
    board ? <div className="board">
      {board.map((row, rowIndex) => {
        return <div className="squareRow">{row.map((cellData, columnIndex) => {
          const coordinates = [rowIndex, columnIndex];
          const isValidMove = moverCanMoveTo(coordinates, cellData);
          if (!cellData) {
            return <BoardCell coordinates={coordinates}
                              isValidMove={isValidMove}
                              moveMoverTo={moveMoverTo} />
          } else {
            const { id, name, faction, steps } = cellData;
            const myTurn = faction === turnFaction.name;
            return <BoardCell unitId={id}
                              unitName={name}
                              unitFaction={faction}
                              unitSteps={steps}
                              coordinates={coordinates}
                              setMover={setMover}
                              mover={mover}
                              myTurn={myTurn}
                              isValidMove={false} />
          }
        })}</div>
      })}
    </div> : <div>board not loaded</div>
  )
}
