// aiEngine.ts

import type { Stickman, GameState } from './types';

// Funzione per calcolare il punteggio di una mossa
const calculateMoveScore = (actor: Stickman, target: Stickman, move: 'ATTACK' | 'DEFEND' | 'MOVE_TOWARD'): number => {
  let score = 0;
  const distance = Math.abs(actor.position.x - target.position.x);

  // Strategia di Attacco
  if (move === 'ATTACK') {
    if (distance < 100) { // Vicino
      score += 50 * actor.aiParams.aggression; // Più aggressivo, più punteggio
    }
    if (target.health < 20) { // Target debole
      score += 100; // Priorità finirlo
    }
    if (actor.state === 'DEFENDING') {
        score -= 30; // Male attaccare mentre ci si difende
    }
  }

  // Strategia di Difesa
  if (move === 'DEFEND') {
      if (distance < 80 && target.state === 'ATTACKING') {
          score += 80; // Essenziale difendersi
      }
      if (actor.health < 30) {
          score += 40; // Più probabile difendersi se si è feriti
      }
  }

  // Strategia di Movimento
  if (move === 'MOVE_TOWARD') {
      if (distance > 150) {
          score += 60; // Avvicinati se lontano
      }
      if (distance < 50 && actor.aiParams.strategy === 'DEFENSIVE') {
          score += 30; // Allontanati leggermente se difensivo
      }
  }

  return score;
};

// Funzione per l'IA: trova il miglior bersaglio e la migliore mossa
export const aiThinkAndExecute = (gameState: GameState, actorId: number): GameState => {
  const actorIndex = gameState.stickmen.findIndex(sm => sm.id === actorId);
  if (actorIndex === -1) return gameState;

  const actor = gameState.stickmen[actorIndex];

  // Trova il bersaglio più vicino (semplice)
  const possibleTargets = gameState.stickmen.filter(sm => sm.id !== actorId && sm.health > 0);
  if (possibleTargets.length === 0) return gameState; // Nessuno da combattere

  // Semplice valutazione per scegliere il target (più vicino)
  let bestTarget = possibleTargets[0];
  let minDistance = Infinity;
  for (const target of possibleTargets) {
      const distance = Math.abs(actor.position.x - target.position.x);
      if (distance < minDistance) {
          minDistance = distance;
          bestTarget = target;
      }
  }

  // Valuta le possibili mosse
  const moves: ('ATTACK' | 'DEFEND' | 'MOVE_TOWARD')[] = ['ATTACK', 'DEFEND', 'MOVE_TOWARD'];
  let bestMove = moves[0];
  let maxScore = -1;

  for (const move of moves) {
    const score = calculateMoveScore(actor, bestTarget, move);
    if (score > maxScore) {
        maxScore = score;
        bestMove = move;
    }
  }

  // --- Esecuzione della Mossa ---
  const nextStickmen = [...gameState.stickmen];
  const targetIndex = nextStickmen.findIndex(sm => sm.id === bestTarget.id);

  if (bestMove === 'ATTACK') {
    nextStickmen[actorIndex] = { ...actor, state: 'ATTACKING', targetId: bestTarget.id };
    nextStickmen[targetIndex] = { ...nextStickmen[targetIndex], health: Math.max(0, nextStickmen[targetIndex].health - 10) };
  } else if (bestMove === 'DEFEND') {
    nextStickmen[actorIndex] = { ...actor, state: 'DEFENDING', targetId: bestTarget.id };
  } else if (bestMove === 'MOVE_TOWARD') {
    nextStickmen[actorIndex] = { ...actor, state: 'MOVING', targetId: bestTarget.id, position: { ...actor.position, x: actor.position.x + (actor.position.x < bestTarget.position.x ? 20 : -20) }};
  }

  // Controlla vittoria
  let winner = null;
  const aliveStickmen = nextStickmen.filter(sm => sm.health > 0);
  if (aliveStickmen.length === 1) {
    winner = aliveStickmen[0].id;
  }

  return {
    ...gameState,
    stickmen: nextStickmen,
    winner: winner
  };
};