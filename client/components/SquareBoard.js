import React from 'react';
import BoardCell from './BoardCell';
import '../style.css';

export default (props) => {
  const {
    board,
    setMover,
    turnFaction,
    moverCanMoveTo,
    mover,
    moveMoverTo,
    combat,
    selectAttacker,
    resetAttack,
    confirmAttack
  } = props;
  return (
    board ? <div className="board">
      {board.map((row, rowIndex) => {
        return <div className="squareRow">{row.map((unit, columnIndex) => {
          const coordinates = [rowIndex, columnIndex];
          const isValidMove = moverCanMoveTo(coordinates, unit);
          if (!unit) {
            return <BoardCell coordinates={coordinates}
            isValidMove={isValidMove}
            moveMoverTo={moveMoverTo} />
          } else {
            const { faction } = unit;
            const myTurn = faction === turnFaction.name;
            return <BoardCell unit={unit}
                              coordinates={coordinates}
                              setMover={setMover}
                              mover={mover}
                              myTurn={myTurn}
                              isValidMove={false}
                              combat={combat}
                              selectAttacker={selectAttacker}
                              resetAttack={resetAttack}
                              confirmAttack={confirmAttack}
                              />
          }
        })}</div>
      })}
    </div> : <div>board not loaded</div>
  )
}
