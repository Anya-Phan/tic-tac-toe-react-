import { useState } from "react";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";

import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const initialBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function derivePlayer(turns) {
    let currentTurn = "X";
    if (turns.length && turns[0].player === "X") currentTurn = "O";
    return currentTurn;
}

function App() {
    const [turns, setTurns] = useState([]);
    const [nameList, setNameList] = useState({
        X: "Player 1",
        O: "Player 2",
    });
    const activePlayer = derivePlayer(turns);

    function handleSelectSquare(row, col) {
        setTurns((prevTurn) => {
            const currentTurn = derivePlayer(prevTurn);
            const newTurn = [
                { square: { row, col }, player: currentTurn },
                ...prevTurn,
            ];

            return newTurn;
        });
    }

    function rematch() {
        setTurns([]);
    }

    let board = [...initialBoard.map((array) => [...array])];
    let winner = null;

    for (const turn of turns) {
        const { square, player } = turn;
        const { row, col } = square;
        board[row][col] = player;
    }

    if (turns.length) {
        const activePlayer = turns[0].player;

        for (let index = 0; index < WINNING_COMBINATIONS.length; index++) {
            const isWinner = WINNING_COMBINATIONS[index].every(
                (cell) => board[cell.row][cell.column] === activePlayer
            );
            if (isWinner) {
                winner = activePlayer;
            }
        }
    }

    let hasDraw = turns.length === 9 && !winner ? true : false;

    function changeName(symbol, name) {
        setNameList((prevList) => {
            const newList = {
                ...prevList,
                [symbol]: name,
            };
            return newList;
        });
    }

    return (
        <main>
            <div id="game-container">
                <ul id="players" className="highlight-player">
                    <Player
                        name="Player 1"
                        symbol="X"
                        isActive={activePlayer}
                        onChangeName={changeName}
                    ></Player>
                    <Player
                        name="Player 2"
                        symbol="O"
                        isActive={activePlayer}
                        onChangeName={changeName}
                    ></Player>
                </ul>
                {(winner || hasDraw) && (
                    <GameOver
                        winner={nameList[winner]}
                        hasDraw={hasDraw}
                        onRestart={rematch}
                    ></GameOver>
                )}
                <GameBoard
                    onSelectSquare={handleSelectSquare}
                    turns={turns}
                    board={board}
                />
            </div>
            <Log turns={turns} />
        </main>
    );
}

export default App;
