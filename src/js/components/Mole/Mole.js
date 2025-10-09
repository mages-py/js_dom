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
    if (this.element.parentElement) {
      this.element.parentElement.remove(this.element);
    }
    cell.append(this.element);
    this.active = true;
  }

  hide() {
    if (this.element.parentElement) {
      this.element.parentElement.remove(this.element);
    }
    this.active = false;
  }

  isActive() {
    return this.active;
  }
}
