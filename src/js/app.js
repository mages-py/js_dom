import { Game } from "./components/Game/Game.js";
import { GameBoard } from "./components/GameBoard/GameBoard.js";
import { Mole } from "./components/Mole/Mole.js";

let gameInstance = null;
let gameBoard = null;
let mole = null;
let scoreEl = null;
let startBtn = null;
let gameOverEl = null;
let finalScoreEl = null;

function createUI() {
  // Кнопка и контейнер уже есть в HTML — просто получаем ссылки
  startBtn = document.getElementById("start-btn");
  gameOverEl = document.getElementById("game-result");
  finalScoreEl = document.getElementById("final-score");

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

function startGame() {
  // Скрываем экран окончания игры, показываем счёт
  // Кнопку НЕ скрываем - она остается видимой для перезапуска
  gameOverEl.style.display = "none";
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
      // Показываем экран окончания игры
      finalScoreEl.textContent = score;
      gameOverEl.style.display = "block";
      scoreEl.style.display = "none";
      // Кнопка "Начать игру" остается видимой - теперь она будет работать как "Играть снова"
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
