import P5 from "p5";
import Ambulance from "./Ambulance";
import Junction from "./Junction";
import Road from "./Road";
import { Direction } from "./Directions";

const sketch = (p5: P5) => {
  let ambulance: Ambulance;
  let junctions: Junction[] = [];
  let roads: Road[] = [];

  const JunctionCount = 5;

  let windowWidth: number, windowHeight: number;

  function convertToIndex(i: number, j: number) {
    return i * JunctionCount + j;
  }

  function convertToCoords(index: number) {
    return { x: index % JunctionCount, y: Math.floor(index / JunctionCount) };
  }

  p5.setup = () => {
    windowWidth = window.innerWidth - 20; // offset to remove scrollbars
    windowHeight = window.innerHeight - 20;

    p5.createCanvas(windowWidth, windowHeight);

    for (let i = 0; i < JunctionCount; ++i) {
      for (let j = 0; j < JunctionCount; ++j) {
        let posy = (windowHeight / (JunctionCount + 1)) * (i + 1);
        let posx = (windowWidth / (JunctionCount + 1)) * (j + 1);
        junctions.push(new Junction(p5, posx, posy));
      }
    }

    const dirs = [-1, 0, 1, 0, -1];
    for (let i = 0; i < junctions.length; ++i) {
      const { x, y } = convertToCoords(i);
      for (let j = 0; j < 4; ++j) {
        const nx = x + dirs[j];
        const ny = y + dirs[j + 1];

        if (nx >= 0 && nx < JunctionCount && ny >= 0 && ny < JunctionCount) {
          junctions[i].neighbours.push(junctions[convertToIndex(ny, nx)]);
        } else {
          junctions[i].neighbours.length++;
        }
      }
    }

    ambulance = new Ambulance(p5, junctions[0], Direction.Left);
  };

  p5.draw = () => {
    p5.background(250);

    roads.forEach((road) => {
      road.draw();
    });
    junctions.forEach((junction) => {
      junction.draw();
    });
    junctions.forEach((junction) => {
      junction.drawLights();
    });
    ambulance.draw();
    // for (let i = 0; i < JunctionCount + 1; ++i) {
    //   let posy = (windowHeight / (JunctionCount + 1)) * i;
    //   let posx = 0;
    //   p5.line(posx, posy, windowWidth, posy);
    // }
    // for (let j = 0; j < JunctionCount + 1; ++j) {
    //   let posy = 0;
    //   let posx = (windowWidth / (JunctionCount + 1)) * j;
    //   p5.line(posx, posy, posx, windowHeight);
    // }
  };
};

new P5(sketch);
