import { Vector } from "p5";
import P5 from "p5";
import Junction from "./Junction";
import { Direction } from "./Directions";

export default class Ambulance {
  p5: P5;
  position: Vector;

  currentJunction: Junction;
  moving = false;

  timeToReach = 3 * 60;
  currentTime = 0;
  speed: Vector = new Vector(0, 0);

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

    if (!this.moving) {
      if (!this.currentJunction.isLightGreen(Direction.Left)) {
        this.currentJunction.overrideLight(Direction.Left);
      }

      this.currentJunction = this.currentJunction.getNextJunction(
        this.path[this.index]
      );
      ++this.index;
      this.moving = true;
      this.currentTime = 0;
      const distanceToReach = Vector.sub(
        this.currentJunction.position,
        this.position
      );
      this.speed = distanceToReach.div(this.timeToReach);
    }

    if (this.moving) {
      this.position.add(this.speed);
      const distanceToReach = Vector.sub(
        this.currentJunction.position,
        this.position
      );
      if (distanceToReach.magSq() < 2) {
        this.moving = false;
      }
    }
  }
}
