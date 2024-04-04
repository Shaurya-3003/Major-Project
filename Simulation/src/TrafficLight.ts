import P5, { Vector } from "p5";

export enum LightState {
  Red,
  Yellow,
  Green,
}

export default class TrafficLight {
  p5: P5;

  position: Vector;

  currentState: LightState;
  greenDuration: number;
  yellowDuration: number;
  redDuration: number;
  color: string = "";

  startTime: number;

  constructor(
    p5: P5,
    x: number,
    y: number,
    currentState: LightState,
    greenDuration: number,
    yellowDuration: number,
    junctionLightCount: number,
    offset: number
  ) {
    this.p5 = p5;

    this.position = this.p5.createVector(x, y);

    this.currentState = currentState;
    this.greenDuration = greenDuration;
    this.yellowDuration = yellowDuration;
    this.redDuration =
      (junctionLightCount - 1) * (greenDuration + yellowDuration);

    this.startTime =
      this.p5.millis() -
      offset * (this.greenDuration + this.yellowDuration) * 1000;

    this.determineColor();
  }

  //Red -> Green -> Yellow -> Red
  draw() {
    let elapsedTime = (this.p5.millis() - this.startTime) / 1000;
    if (
      this.currentState == LightState.Red &&
      elapsedTime >= this.redDuration
    ) {
      this.currentState = LightState.Green;
      this.startTime = this.p5.millis();
      this.determineColor();
    } else if (
      this.currentState == LightState.Green &&
      elapsedTime >= this.greenDuration
    ) {
      this.currentState = LightState.Yellow;
      this.startTime = this.p5.millis();
      this.determineColor();
    } else if (
      this.currentState == LightState.Yellow &&
      elapsedTime >= this.yellowDuration
    ) {
      this.currentState = LightState.Red;
      this.startTime = this.p5.millis();
      this.determineColor();
    }

    this.p5.fill(this.color);
    this.p5.ellipse(this.position.x, this.position.y, 10, 10);
  }

  determineColor() {
    switch (this.currentState) {
      case LightState.Red:
        this.color = "red";
        break;
      case LightState.Yellow:
        this.color = "yellow";
        break;
      case LightState.Green:
        this.color = "green";
        break;
    }
  }

  // For a 4 way junction, the offset needs to be 0, 1, or 2 only.
  changeToRed(offset: number) {
    this.currentState = LightState.Red;
    this.startTime =
      this.p5.millis() -
      offset * (this.greenDuration + this.yellowDuration) * 1000;
    this.determineColor();
  }

  changeToGreen() {
    this.currentState = LightState.Green;
    this.startTime = this.p5.millis();
    this.determineColor();
  }
}
