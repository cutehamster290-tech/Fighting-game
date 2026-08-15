// types.ts

export interface Vector {
  x: number;
  y: number;
}

export interface Stickman {
  id: number;
  position: Vector;
  velocity: Vector;
  health: number;
  state: 'IDLE' | 'ATTACKING' | 'DEFENDING' | 'MOVING' | 'STUNNED';
  targetId: number | null;
  aiParams: {
    aggression: number; // 0-1, quanto attacca
    strategy: 'OFFENSIVE' | 'DEFENSIVE' | 'BALANCED';
  };
  color: string;
  width: number;
  height: number;
}

export interface GameState {
  stickmen: Stickman[];
  turn: number; // Per combattimenti a turni (più facile da gestire per l'IA)
  winner: number | null;
}