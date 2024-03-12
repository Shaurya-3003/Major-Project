import "./verticalStopLine.css"
import VerticalStopLine from "./VerticalStopLine"

function VerticalRoad(props){

    const marginLeft=(props.num+1)*350-props.num*27

    return <>
        <div className="verticalRoad" style={{marginLeft:`${marginLeft}px`}}></div>
        <VerticalStopLine marginLeft={marginLeft}/>
    </>
}

export default VerticalRoad