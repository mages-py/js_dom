export class Game {
  constructor(gameBoard, mole, onScoreChange, onGameOver) {
    this.gameBoard = gameBoard;
    this.mole = mole;
    this.onScoreChange = onScoreChange;
    this.onGameOver = onGameOver;
    this.reset();
  }

  reset() {
    this.score = 0;
    this.misses = 0;
    this.isRunning = false;
    this.timeoutId = null;
  }

  start() {
    this.reset();
    this.isRunning = true;
    this.onScoreChange(this.score, this.misses);
    this.spawnMole();
  }

  spawnMole() {
    if (!this.isRunning) return;
    const cell = this.gameBoard.getRandomCell();
    this.mole.show(cell);
    this.timeoutId = setTimeout(() => {
      if (this.mole.isActive()) {
        this.mole.hide();
        this.misses++;
        this.onScoreChange(this.score, this.misses);
        if (this.misses >= 5) {
          this.gameOver();
        } else {
          this.spawnMole();
        }
      }
    }, 1000);
  }

  handleHit() {
    if (!this.mole.isActive()) return;
    clearTimeout(this.timeoutId);
    this.mole.hide();
    this.score++;
    this.onScoreChange(this.score, this.misses);
    this.spawnMole();
  }

  gameOver() {
    this.isRunning = false;
    this.onGameOver(this.score);
  }

  stop() {
    this.isRunning = false;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    if (this.mole && this.mole.isActive()) {
      this.mole.hide();
    }
  }
}
