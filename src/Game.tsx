import Stickman from './Stickman'
import {Stage, Layer} from 'react-konva'
import './css/Game.css'

export function Game() {
    const Abilities = ['Attack', 'Defend', 'Regen']
    const w = window.innerWidth
    const h = 400

    return (
        <div id="Game">
            <div id="Abilities">
                {Abilities.map((a) => (
                    <button key={a}>{a}</button>
                ))}
            </div>
            <Stage id='Stage' width={w} height={h}>
                <Layer>
                    <Stickman x={150} y={180} color="#333"/>
                    <Stickman x={450} y={180} color="#d9534f"/>
                </Layer>
            </Stage>
        </div>
    )
}