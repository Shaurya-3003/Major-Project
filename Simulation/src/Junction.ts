import { Vector } from "p5";
import P5 from "p5";
import TrafficLight, { LightState } from "./TrafficLight";
import { Direction } from "./Directions";

export default class Junction {
  position: Vector;
  p5: P5;
  size = 20;

  roadBorderLength = 20;
  roadBorderThickness = 5;
  lightsPerJunction = 4;

  trafficLights: TrafficLight[];
  neighbours: Junction[] = [];

  constructor(p5: P5, x: number, y: number) {
    this.p5 = p5;
    this.position = p5.createVector(x, y);
    this.trafficLights = [];

    const dirs = [0, -1, 0, 1, 0];
    const random = Math.random() / 2;
    for (let i = 0; i < this.lightsPerJunction; ++i) {
      this.trafficLights.push(
        new TrafficLight(
          this.p5,
          this.position.x + this.size * dirs[i],
          this.position.y + this.size * dirs[i + 1],
          LightState.Red,
          5,
          2,
          this.lightsPerJunction,
          i - random
        )
      );
    }
  }

  draw() {
    this.p5.fill(20);

    this.p5.push();

    // This causes all susequent draws to take place from the center of junction
    this.p5.translate(this.position.x, this.position.y);
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

  drawLights() {
    this.trafficLights.forEach((trafficLight) => {
      trafficLight.draw();
    });
  }

  drawRoad() {
    this.p5.fill(80);
    this.p5.noStroke();
    this.p5.rect(-this.size, -this.size, 2 * this.size, 2 * this.size);

    this.neighbours.forEach((neighbour) => {
      const width = neighbour.position.x - this.position.x + 2 * this.size;
      const height = neighbour.position.y - this.position.y + 2 * this.size;
      this.p5.rect(-this.size, -this.size, width, height);
    });

    // this.p5.rect(
    //   -this.size,
    //   -this.roadBorderLength - this.size,
    //   2 * this.size,
    //   2 * (this.roadBorderLength + this.size)
    // );
  }

  isLightGreen(direction: Direction) {
    switch (direction) {
      case Direction.Up:
        return this.trafficLights[0].currentState === LightState.Green;
      case Direction.Left:
        return this.trafficLights[1].currentState === LightState.Green;
      case Direction.Down:
        return this.trafficLights[2].currentState === LightState.Green;
      case Direction.Right:
        return this.trafficLights[3].currentState === LightState.Green;
    }
  }

  getStopLocation(direction: Direction) {
    switch (direction) {
      case Direction.Up:
        return this.p5.createVector(
          this.position.x,
          this.position.y - this.size
        );
      case Direction.Left:
        return this.p5.createVector(
          this.position.x - this.size,
          this.position.y
        );
      case Direction.Down:
        return this.p5.createVector(
          this.position.x,
          this.position.y + this.size
        );
      case Direction.Right:
        return this.p5.createVector(
          this.position.x + this.size,
          this.position.y
        );
      default:
        return this.p5.createVector(0, 0);
    }
  }

  getNextJunction(direction: Direction) {
    switch (direction) {
      case Direction.Up:
        return this.neighbours[3];
      case Direction.Down:
        return this.neighbours[1];
      case Direction.Left:
        return this.neighbours[0];
      case Direction.Right:
        return this.neighbours[2];
    }
  }

  getLight(direction: Direction) {
    switch (direction) {
      case Direction.Up:
        return this.trafficLights[0];
      case Direction.Left:
        return this.trafficLights[1];
      case Direction.Down:
        return this.trafficLights[2];
      case Direction.Right:
        return this.trafficLights[3];
    }
  }

  overrideLight(direction: Direction) {
    switch (direction) {
      case Direction.Left:
        this.getLight(Direction.Left).changeToGreen();
        this.getLight(Direction.Up).changeToRed(2);
        this.getLight(Direction.Right).changeToRed(1);
        this.getLight(Direction.Down).changeToRed(0);
        break;
      case Direction.Up:
        this.getLight(Direction.Up).changeToGreen();
        this.getLight(Direction.Right).changeToRed(2);
        this.getLight(Direction.Down).changeToRed(1);
        this.getLight(Direction.Left).changeToRed(0);
        break;
      case Direction.Right:
        this.getLight(Direction.Right).changeToGreen();
        this.getLight(Direction.Down).changeToRed(2);
        this.getLight(Direction.Left).changeToRed(1);
        this.getLight(Direction.Up).changeToRed(0);
        break;
      case Direction.Down:
        this.getLight(Direction.Down).changeToGreen();
        this.getLight(Direction.Left).changeToRed(2);
        this.getLight(Direction.Up).changeToRed(1);
        this.getLight(Direction.Right).changeToRed(0);
        break;
    }
  }
}
