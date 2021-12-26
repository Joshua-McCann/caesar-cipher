import "./Dial.css"
import {useContext, useEffect, useState} from "react";
import TranslationContext from "../context/TranslationContext";

function Dial() {

    const [nums, setNums] = useState(['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', 'BA', 'AB']);
    const [current, setCurrent] = useState({x:0, y:0});
    const [dialSize, setDialSize] = useState({width: window.innerWidth / 2, height: window.innerWidth / 2})
    const [selectorPosition, setSelectorPosition] = useState({left: dialSize.width /2 - 38})

    const translationContext = useContext(TranslationContext);

    useEffect(()=>{
        const setView = ()=>{
            const newSize = {width: window.innerWidth/2, height: window.innerWidth/2}
            setDialSize(newSize);
            const newPos = {left: newSize.width/2 - 38 };
            setSelectorPosition(newPos);
        }
        window.addEventListener('resize', setView);
        return ()=>window.removeEventListener('resize', setView);
    })

    function calculatePosition(index) {
        const radius = dialSize.width/2 + 28;
        const offset = 45;
        const angle = (index + nums.length * 1.75) * Math.PI/nums.length*2;
        const start = radius - offset
        const x = start + radius * Math.cos(angle);
        const y = start + radius * Math.sin(angle);
        return {left: x + 'px', top: y + 'px', zIndex: index, transform: `rotate(${360 / nums.length * (index)}deg)`};
    }

    function rotate(event) {
        const x = event.clientX - current.x;
        const y = event.clientY - current.y;
        const threshold = 50;
        const stopped = event.clientX === 0 && event.clientY === 0;
        if (!stopped && (Math.abs(x) > threshold || Math.abs(y) > threshold)) {
            const newNums = [...nums];
            let num = Math.abs(x) > Math.abs(y) ? x : y;
            if (num < 0) {
                newNums.push(newNums.shift());
            } else {
                newNums.unshift(newNums.pop());
            }
            setCurrent({x: event.clientX, y: event.clientY});
            setNums(newNums);
            translationContext.setOffset(newNums[0]);
        }
    }

    return (
        <div id="dial" className="dial" style={dialSize}  onMouseDown={(event) => setCurrent({x: event.clientX, y: event.clientY})}>
            {nums.map((num, i) => <span key={num} id={`num${i}`} className="number" style={calculatePosition(i)}>{num}</span>)}
            <div className="selectable selector-boarder" style={selectorPosition}/>
            <div className="selectable selector" style={selectorPosition} draggable onDrag={rotate}/>
        </div>
    )

}

export default Dial;