import { useState } from "react";

export default function Player({ name, symbol, isActive, onChangeName }) {
    const [isEdit, setIsEdit] = useState(false);
    const [editName, setEditName] = useState(name);
    function handleClick() {
        setIsEdit(!isEdit);
    }

    function handleChange(e) {
        onChangeName(symbol, e.target.value);
        setEditName(e.target.value);
    }
    let playerName, btnName;
    if (isEdit) {
        playerName = (
            <input
                type="text"
                required
                value={editName}
                onChange={handleChange}
            />
        );
        btnName = "Save";
    } else {
        playerName = <span className="player-name">{editName}</span>;
        btnName = "Edit";
    }

    return (
        <li className={isActive === symbol ? "active" : ""}>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>

            <button onClick={handleClick}>{btnName}</button>
        </li>
    );
}
