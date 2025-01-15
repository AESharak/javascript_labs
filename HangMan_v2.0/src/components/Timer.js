export class Timer {
  constructor(display, initialTime, onTimeUp) {
    this.display = display;
    this.timeLeft = initialTime;
    this.onTimeUp = onTimeUp;
    this.timer = null;
  }

  start(time = this.timeLeft) {
    this.timeLeft = time;
    clearInterval(this.timer);
    this.display.textContent = this.timeLeft;

    this.timer = setInterval(() => {
      this.timeLeft--;
      this.display.textContent = this.timeLeft;
      if (this.timeLeft <= 0) {
        this.stop();
        this.onTimeUp();
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.timer);
  }
}
