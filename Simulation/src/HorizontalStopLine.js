import { useEffect, useState } from "react"
import "./horizontalStopLine.css"


function HorizontalStopLine(props) {
    const index = props.index
    const [circle, setCircle]=useState(20000)
    let flag = false

    setInterval(() => {
        const el = document.getElementsByClassName("circle")[0] ?? 0
        setCircle(el.getBoundingClientRect().right ?? 20000)
    }, 350);

    const [color, setColor] = useState("red")

    useEffect(() => {
        const el = document.getElementsByClassName("horizontalStopLine")[index]
        const x = el.getBoundingClientRect().left ?? false
        flag = Boolean(Math.abs(x - circle) < 50)
        flag ? setColor("green") : setColor("red")
    }, [circle])

    return <>
        <div className="trafficLight" style={{ marginLeft: props.marginLeft, backgroundColor: color }}></div>
        <div className="horizontalStopLine" style={{ marginLeft: props.marginLeft }}></div>
    </>
}

export default HorizontalStopLine;