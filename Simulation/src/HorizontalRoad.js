import HorizontalStopLine from "./HorizontalStopLine";

const arr = []
const vertStops = 3
for (let i = 0; i < 3; i++) {
    arr[i] = `${(100 / (vertStops + 1)) * (i + 1)}%`
}

function HorizontalRoad() {
    return <div style={{ backgroundColor: "grey", height: "90px", marginTop: "45vh" }}>
        {arr.map((percent, index) => (
            <HorizontalStopLine marginLeft={percent} index={index} key={index} />
        ))}
    </div>

}

export default HorizontalRoad;