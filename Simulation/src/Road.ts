import Junction from "./Junction";
import P5, { Vector } from "p5";

export default class Road {
  p5: P5;
  j1: Junction;
  j2: Junction;
  distance: Vector;

  constructor(p5: P5, j1: Junction, j2: Junction) {
    this.p5 = p5;
    this.j1 = j1;
    this.j2 = j2;

    this.distance = Vector.sub(this.j2.position, this.j1.position);
  }

  draw() {
    this.p5.fill(80);
    this.p5.noStroke();

    this.p5.rect(
      this.j1.position.x + this.j1.size,
      this.j1.position.y + this.j1.size,
      this.distance.x - 2 * this.j1.size,
      this.distance.y - 2 * this.j1.size
    );
  }
}
