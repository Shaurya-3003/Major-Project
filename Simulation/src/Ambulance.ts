import { Vector } from "p5";
import P5 from "p5";
import Junction from "./Junction";

export default class Ambulance {
  p5: P5;
  position: Vector;

  currentJunction: Junction;

  constructor(x: number, y: number, p5: P5, startJunction: Junction) {
    this.position = p5.createVector(x, y);
    this.p5 = p5;
    this.currentJunction = startJunction;
  }

  draw() {
    this.p5.fill(220, 20, 50);
    this.p5.ellipse(this.position.x, this.position.y, 10, 10);
  }
}
