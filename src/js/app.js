import { Game } from "./components/Game/Game.js";
import { GameBoard } from "./components/GameBoard/GameBoard.js";
import { Mole } from "./components/Mole/Mole.js";

let gameInstance = null;
let gameBoard = null;
let mole = null;
let scoreEl = null;
let startBtn = null;
let uiControls = null;

function createUI() {
  // Кнопка и контейнер уже есть в HTML — просто получаем ссылки
  startBtn = document.getElementById("start-btn");
  uiControls = document.getElementById("ui-controls");

  // Создаём элемент счёта (скрыт до старта)
  scoreEl = document.createElement("div");
  scoreEl.id = "score";
  scoreEl.style.cssText = `
    text-align: center;
    font-size: 20px;
    margin: 10px 0;
    font-family: sans-serif;
    display: none;
  `;
  document.body.insertBefore(scoreEl, document.getElementById("game-board"));
}

function showStartScreen() {
  if (scoreEl) scoreEl.style.display = "none";
  if (uiControls) uiControls.style.display = "block";
  if (gameBoard) gameBoard.clear();
}

function startGame() {
  // Скрываем кнопку, показываем счёт
  uiControls.style.display = "none";
  scoreEl.style.display = "block";

  // Создаём игру при первом запуске или перезапускаем
  if (!gameBoard) {
    gameBoard = new GameBoard("game-board");
    mole = new Mole();
  } else {
    gameBoard.clear();
  }

  if (gameInstance) {
    gameInstance.stop();
  }

  const updateScore = (score, misses) => {
    scoreEl.textContent = `Очки: ${score} | Промахи: ${misses}/5`;
  };

  const endGame = (score) => {
    setTimeout(() => {
      alert(`Игра окончена! Ваш счёт: ${score}`);
      showStartScreen();
    }, 100);
  };

  gameInstance = new Game(gameBoard, mole, updateScore, endGame);
  mole.onClick = () => gameInstance.handleHit();
  gameInstance.start();
}

export function initGame() {
  createUI();
  startBtn.addEventListener("click", startGame);
}
