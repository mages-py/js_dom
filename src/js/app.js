import { GameBoard } from "./components/GameBoard/GameBoard.js";
import { Mole } from "./components/Mole/Mole.js";

export function initGame() {
  const gameBoard = new GameBoard("game-board");
  const mole = new Mole();

  const moveMole = () => {
    const currentIndex = mole.getCurrentCellIndex();
    const targetCell = gameBoard.getRandomCell(currentIndex);
    mole.moveTo(targetCell);
  };

  moveMole();
  setInterval(moveMole, 1000);
}
