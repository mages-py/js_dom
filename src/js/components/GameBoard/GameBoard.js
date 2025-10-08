import "./GameBoard.css";

const BOARD_SIZE = 4;

export class GameBoard {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      throw new Error(`Элемент с id="${containerId}" не найден в DOM!`);
    }
    this.container.classList.add("game-board");
    this.cells = [];
    this.totalCells = BOARD_SIZE * BOARD_SIZE;
    this.init();
  }

  init() {
    for (let i = 0; i < this.totalCells; i++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.index = i;
      this.container.appendChild(cell);
      this.cells.push(cell);
    }
  }

  getRandomCell() {
    return this.cells[Math.floor(Math.random() * this.totalCells)];
  }

  clear() {
    this.cells.forEach((cell) => (cell.innerHTML = ""));
  }
}
