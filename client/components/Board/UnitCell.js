import React from 'react';
import CellHeader from './CellHeader';
import CellButtons from './CellButtons';
import '../../style.css';

export default (props) => {
  const {
    coordinates,
    unit,
    turnFaction,
    setMover,
    mover,
    combat,
    selectAttacker,
    resetAttack,
    confirmAttack
  } = props;
  const { faction } = unit;
  return (
    <div className={faction}>
      <CellHeader coordinates={coordinates} unit={unit} />
      <CellButtons  unit={unit}
                    coordinates={coordinates}
                    turnFaction={turnFaction}
                    setMover={setMover}
                    mover={mover}
                    combat={combat}
                    selectAttacker={selectAttacker}
                    resetAttack={resetAttack}
                    confirmAttack={confirmAttack} />
    </div>
  )
}