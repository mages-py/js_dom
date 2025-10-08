import "./Mole.css";
import goblinImage from "../../../img/goblin.png"; // ← путь к общей папке img

export class Mole {
  constructor() {
    this.element = document.createElement("img");
    this.element.src = goblinImage;
    this.element.alt = "Goblin";
    this.element.classList.add("mole-character");
  }

  getCurrentCellIndex() {
    const parent = this.element.parentElement;
    return parent ? parseInt(parent.dataset.index, 10) : null;
  }

  moveTo(cell) {
    cell.append(this.element); // Автоматическое перемещение в DOM
  }
}
