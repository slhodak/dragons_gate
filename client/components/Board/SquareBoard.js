import React from 'react';
import UnitCell from './UnitCell';
import EmptyCell from './EmptyCell';
import '../../style.css';

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
    board ? 
      <div className="board">
        {board.map((column, columnIndex) => {
          return (
            <div className="squareColumn">
              {column.map((unit, rowIndex) => {
                const coordinates = [columnIndex, rowIndex];
                const isValidMove = moverCanMoveTo(coordinates, unit);
                return (
                  <div className="squareCell">
                    {unit ?
                      <UnitCell coordinates={coordinates}
                                unit={unit}
                                turnFaction={turnFaction}
                                setMover={setMover}
                                mover={mover}
                                combat={combat}
                                selectAttacker={selectAttacker}
                                resetAttack={resetAttack}
                                confirmAttack={confirmAttack} />
                      :
                      <EmptyCell  isValidMove={isValidMove}
                                  coordinates={coordinates}
                                  moveMoverTo={moveMoverTo} />}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div> :
    <div>board not loaded</div>
  )
}
