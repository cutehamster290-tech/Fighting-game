import './css/Game.css'

export function Game() {
    const Abilities = ['Attack', 'Defend', 'Regen']

    return (
        <div id="Main">
            <div id="Abilities">
                {Abilities.map((a) => (
                    <button key={a}>{a}</button>
                ))}
            </div>
            <canvas></canvas>
        </div>
    )
}