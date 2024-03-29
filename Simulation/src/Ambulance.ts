import { Vector } from "p5";
import P5 from "p5";

export default class Ambulance {
  p5: P5;
  position: Vector;

  constructor(x: number, y: number, p5: P5) {
    this.position = p5.createVector(x, y);
    this.p5 = p5;
  }

  draw() {
    this.p5.fill(220, 20, 50);
    this.p5.ellipse(this.position.x, this.position.y, 10, 10);
  }
}
