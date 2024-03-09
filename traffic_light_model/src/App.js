import { useState, useEffect } from 'react'
import './style.css'

function App() {

    const [color, setColor] = useState("green")
    const [detected, setDetected] = useState("Ambulance Not Detected")
    const click = () => {
        if(color==="green"){
            setColor("red")
            setDetected("Ambulance Not Detected")
        }
        else {
            setColor("green")
            setDetected("Ambulance Detected")
        }
    }
    
    useEffect(() => {
        const circle=document.getElementsByClassName("circle")[0]
        circle.style.backgroundColor=color
    }, [color])
    
    return (<div onClick={click} style={{height:"100vh"}}>
        <button>Start Recording</button>
        <button>Stop Recording</button>
        <div className='circle'></div>
        <h3>{detected}</h3>
    </div>)
}
export default App;
