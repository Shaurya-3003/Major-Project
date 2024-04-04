import P5 from "p5";
import Ambulance from "./Ambulance";
import Junction from "./Junction";
import Road from "./Road";

const sketch = (p5: P5) => {
  let ambulance: Ambulance;
  let junctions: Junction[] = [];
  let roads: Road[] = [];

  const JunctionCount = 5;

  let windowWidth: number, windowHeight: number;

  function convertToIndex(i: number, j: number) {
    return i * JunctionCount + j;
  }

  let delta = 0;

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

    for (let i = 0; i < JunctionCount; ++i) {
      for (let j = 0; j < JunctionCount - 1; ++j) {
        roads.push(
          new Road(
            p5,
            junctions[convertToIndex(i, j)],
            junctions[convertToIndex(i, j + 1)]
          )
        );
      }
    }

    for (let i = 0; i < JunctionCount - 1; ++i) {
      for (let j = 0; j < JunctionCount; ++j) {
        roads.push(
          new Road(
            p5,
            junctions[convertToIndex(i, j)],
            junctions[convertToIndex(i + 1, j)]
          )
        );
      }
    }
    ambulance = new Ambulance(10, 10, p5, junctions[0]);
  };

  p5.draw = () => {
    p5.background(250);

    ambulance.draw();

    roads.forEach((road) => {
      road.draw();
    });
    junctions.forEach((junction) => {
      junction.draw();
    });

    if (p5.deltaTime > delta) {
      console.log(p5.deltaTime);
      delta = p5.deltaTime;
    }
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
