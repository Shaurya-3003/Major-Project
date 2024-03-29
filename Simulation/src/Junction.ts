import { Vector } from "p5";
import P5 from "p5";

export default class Junction {
  position: Vector;
  p5: P5;
  size = 20;

  roadBorderLength = 20;
  roadBorderThickness = 5;

  constructor(p5: P5, x: number, y: number) {
    this.p5 = p5;
    this.position = p5.createVector(x, y);
  }

  draw() {
    this.p5.fill(20);

    this.p5.push();

    // This causes all susequent draws to take place from the center of junction
    this.p5.translate(this.position.x, this.position.y);
    //this.drawRoadBorder();
    this.drawRoad();

    this.p5.pop();

    //this.p5.ellipse(this.position.x, this.position.y, this.size, this.size);
  }

  drawRoadBorder() {
    this.p5.rect(
      -this.size,
      -this.size,
      -this.roadBorderThickness,
      -this.roadBorderLength
    ); // Upper Left up
    this.p5.rect(
      this.size,
      -this.size,
      this.roadBorderThickness,
      -this.roadBorderLength
    ); // Upper right up

    this.p5.rect(
      this.size,
      -this.size,
      this.roadBorderLength,
      -this.roadBorderThickness
    ); // upper right right
    this.p5.rect(
      this.size,
      this.size,
      this.roadBorderLength,
      this.roadBorderThickness
    ); // Bottom right right

    this.p5.rect(
      this.size,
      this.size,
      this.roadBorderThickness,
      this.roadBorderLength
    ); // Bottom right bottom
    this.p5.rect(
      -this.size,
      this.size,
      -this.roadBorderThickness,
      this.roadBorderLength
    ); // Bottom left bottom

    this.p5.rect(
      -this.size,
      this.size,
      -this.roadBorderLength,
      this.roadBorderThickness
    ); // Bottom left left
    this.p5.rect(
      -this.size,
      -this.size,
      -this.roadBorderLength,
      -this.roadBorderThickness
    ); //Upper left left
  }

  drawRoad() {
    this.p5.fill(80);
    this.p5.noStroke();
    this.p5.rect(-this.size, -this.size, 2 * this.size, 2 * this.size);

    // this.p5.rect(
    //   -this.size,
    //   -this.roadBorderLength - this.size,
    //   2 * this.size,
    //   2 * (this.roadBorderLength + this.size)
    // );
  }
}
