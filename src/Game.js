import React, { useState } from 'react';
import Board from './Board';
import OptionForm from './optionForm';
import './Game.css';

function Game() {
  const [row, setRow] = useState(0);
  
    return (
      <div className="Game">
        <OptionForm
          onChange={row => setRow({row})}
        />
        {row}
        <Board
        />
      </div>
    );
  }

export default Game;
