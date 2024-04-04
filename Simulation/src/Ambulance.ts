import { Vector } from "p5";
import P5 from "p5";
import Junction from "./Junction";
import { Direction } from "./Directions";

export default class Ambulance {
  p5: P5;
  position: Vector;

  currentJunction: Junction;
  moving = false;

  baseSpeed: Vector = new Vector(1, 1);
  speed: Vector = new Vector(0, 0);

  stopLocation: Vector = new Vector(0, 0);

  path: Direction[] = [
    Direction.Right,
    Direction.Down,
    Direction.Down,
    Direction.Right,
    Direction.Right,
    Direction.Down,
    Direction.Down,
    Direction.Right,
  ];
  index = 0;
  constructor(p5: P5, startJunction: Junction, direction: Direction) {
    this.p5 = p5;
    this.currentJunction = startJunction;
    this.position = this.currentJunction.getStopLocation(direction);
  }

  draw() {
    this.p5.fill(220, 20, 50);
    this.p5.rect(this.position.x, this.position.y, 10, 10);

    if (!this.moving && this.index < this.path.length) {
      if (
        !this.currentJunction.isLightGreen((this.path[this.index - 1] + 2) % 4)
      ) {
        this.currentJunction.overrideLight((this.path[this.index - 1] + 2) % 4);
      }

      this.currentJunction = this.currentJunction.getNextJunction(
        this.path[this.index]
      );
      this.stopLocation = this.currentJunction.getStopLocation(
        (this.path[this.index] + 2) % 4
      );
      ++this.index;
      const distanceToReach = Vector.sub(
        this.stopLocation,
        this.position
      ).normalize();
      this.moving = true;
      this.speed = Vector.mult(this.baseSpeed, distanceToReach)!;
    }

    if (this.moving) {
      this.position.add(this.speed);
      const distanceToReach = Vector.sub(this.stopLocation, this.position);
      if (distanceToReach.magSq() < 2) {
        this.moving = false;
      }
    }
  }
}
