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
          return <BoardCell unit={unit}
                            coordinates={coordinates}
                            isValidMove={isValidMove}
                            turnFaction={turnFaction}
                            setMover={setMover}
                            moveMoverTo={moveMoverTo}
                            mover={mover}
                            combat={combat}
                            selectAttacker={selectAttacker}
                            resetAttack={resetAttack}
                            confirmAttack={confirmAttack}
                            />
        })}</div>
      })}
    </div> : <div>board not loaded</div>
  )
}
