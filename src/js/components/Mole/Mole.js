import "./Mole.css";
import goblinImage from "../../../img/goblin.png";

export class Mole {
  constructor() {
    this.element = document.createElement("img");
    this.element.src = goblinImage;
    this.element.alt = "Goblin";
    this.element.classList.add("mole-character");
    this.active = false;
    this.onClick = null;

    this.element.addEventListener("click", (e) => {
      e.stopPropagation();
      if (this.active && this.onClick) {
        this.onClick();
      }
    });
  }

  show(cell) {
    this.element.remove();
    cell.append(this.element);
    this.active = true;
  }

  hide() {
    this.element.remove();
    this.active = false;
  }

  isActive() {
    return this.active;
  }
}
