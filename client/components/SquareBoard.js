import React from 'react';
import BoardCell from './BoardCell.js';
import '../style.css';

export default (props) => {
  const { board, setMover, turnFaction, moverCanMoveTo, mover } = props;
  return (
    board ? <div className="board">
      {board.map((row, rowIndex) => {
        return <div className="squareRow">{row.map((cellData, columnIndex) => {
          const coordinates = [columnIndex, rowIndex];
          const isValidMove = moverCanMoveTo(coordinates);
          if (!cellData) {
            return <BoardCell coordinates={coordinates}
                              isValidMove={isValidMove} />
          } else {
            const { id, name, faction } = cellData;
            const myTurn = faction === turnFaction.name;
            return <BoardCell unitId={id}
                              unitName={name}
                              coordinates={coordinates}
                              setMover={setMover}
                              mover={mover}
                              myTurn={myTurn}
                              isValidMove={isValidMove} />
          }
        })}</div>
      })}
    </div> : <div>board not loaded</div>
  )
}
