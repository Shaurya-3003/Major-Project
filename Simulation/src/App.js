// import Circle from "./Circle";
// import HorizontalStopLine from "./HorizontalStopLine";
import Circle from "./Circle";
import HorizontalRoad from "./HorizontalRoad";
import VerticalRoad from "./VerticalRoad";

// const arr = []
// const vertStops = 3
// for (let i = 0; i < 3; i++) {
//   arr[i] = `${(100 / (vertStops + 1)) * (i + 1)}%`
// }
const verticalRoads=3
const arr=[]
for(let i=0;i<verticalRoads;i++){
  arr.push(i)
}

console.log(arr)

function App() {
  return (
    // <div style={{ backgroundColor: "grey", height: "90px", marginTop: "45vh" }}>
    <>
      <Circle/>
      <HorizontalRoad/>
      {
        arr.map((item, index)=>(
          <VerticalRoad key={index} num={item}/>
        ))
      }
      {/* <VerticalRoad/> */}
    </>
  );
}

export default App;
