import { Vector } from "p5";
import P5 from "p5";
import Junction from "./Junction";
import { Direction } from "./Directions";

export default class Ambulance {
  p5: P5;
  position: Vector;

  currentJunction: Junction;
  moving = false;

  baseSpeed: Vector = new Vector(0.5, 0.5);
  speed: Vector = new Vector(0, 0);

  stopLocation: Vector = new Vector(0, 0);
  signalSent = false;

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
      this.signalSent = false;

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
      let distanceToReach = Vector.sub(this.stopLocation, this.position);
      const farSpeedDist = 100;
      const nearSpeedDist = 20;
      let speedMult =
        distanceToReach.magSq() > farSpeedDist * farSpeedDist ||
        distanceToReach.magSq() < nearSpeedDist * nearSpeedDist
          ? 0.5
          : 1;

      this.p5.text(speedMult, this.position.x, this.position.y);
      //speedMult = 1;
      this.position.add(Vector.mult(this.speed, speedMult)!);
      distanceToReach = Vector.sub(this.stopLocation, this.position);
      if (distanceToReach.magSq() < farSpeedDist * farSpeedDist) {
        if (!this.signalSent) {
          this.currentJunction.overrideLight(
            (this.path[this.index - 1] + 2) % 4
          );
          this.signalSent = true;
        }
      }

      if (distanceToReach.magSq() < 2) {
        this.moving = false;
        //Triggers the change in junction
      }
    }
  }
}
