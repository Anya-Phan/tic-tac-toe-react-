export default function GameOver({ winner, hasDraw, onRestart }) {
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            {hasDraw ? <p>DRAW!</p> : <p>{winner} won!</p>}

            <p>
                <button onClick={onRestart}>Rematch!</button>
            </p>
        </div>
    );
}
