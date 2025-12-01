export default function GameBoard({ onSelectSquare, board }) {
    return (
        <ol id="game-board">
            {board.map((row, i) => (
                <li key={i}>
                    <ol>
                        {row.map((col, j) => (
                            <li key={j}>
                                <button
                                    onClick={(e) => onSelectSquare(i, j)}
                                    disabled={col !== null}
                                >
                                    {col}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}
