import { useState, useEffect } from 'react';
import { GameCanvas } from './GameCanvas';
import type { Stickman, GameState } from './types';
import { aiThinkAndExecute } from './aiEngine';

const initialStickmen: Stickman[] = [
  { id: 1, position: { x: 100, y: 300 }, velocity: { x: 0, y: 0 }, health: 100, state: 'IDLE', targetId: null, aiParams: { aggression: 0.7, strategy: 'OFFENSIVE' }, color: 'blue', width: 40, height: 100 },
  { id: 2, position: { x: 700, y: 300 }, velocity: { x: 0, y: 0 }, health: 100, state: 'IDLE', targetId: null, aiParams: { aggression: 0.4, strategy: 'DEFENSIVE' }, color: 'red', width: 40, height: 100 }
];

const initialState: GameState = {
  stickmen: initialStickmen,
  turn: 1,
  winner: null
};

export const GameContainer = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);

  useEffect(() => {
    if (gameState.winner !== null) return;

    const turnTimeout = setTimeout(() => {
      const actorId = gameState.turn;
      const nextState = aiThinkAndExecute(gameState, actorId);

      setGameState(nextState);

      setGameState(prev => ({
        ...prev,
        turn: (prev.turn % prev.stickmen.length) + 1
      }));

    }, 800);

    return () => clearTimeout(turnTimeout);

  }, [gameState]);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Stickman Battle Arena</h1>
      {gameState.winner && <h2>Vincitore: Stickman {gameState.winner}</h2>}
      <GameCanvas gameState={gameState} />
    </div>
  );
};