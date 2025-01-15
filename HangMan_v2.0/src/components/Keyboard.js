export class Keyboard {
  constructor(container, onKeyClick) {
    this.container = container;
    this.onKeyClick = onKeyClick;
  }

  setup() {
    for (let j = 97; j <= 122; j++) {
      const key = document.createElement("button");
      key.innerText = String.fromCharCode(j);
      this.container.appendChild(key);
      key.addEventListener("click", (e) => {
        this.onKeyClick(e.target, String.fromCharCode(j));
      });
    }
  }

  reset() {
    this.container.querySelectorAll("button").forEach((key) => {
      key.disabled = false;
    });
  }
}
