import Dial from "./components/Dial";
import {useEffect, useState} from "react";
import TranslationContext from "./context/TranslationContext";
import TypeArea from "./components/TypeArea";
import TranslateArea from "./components/TranslateArea";

function App() {

    const [offset, setOffset] = useState('00');
    const [text, setText] = useState('');
    const [viewSize, setViewSize] = useState({width: window.innerWidth - 1, height: window.innerHeight - 1})

    const translation = { offset, setOffset, text, setText };

    useEffect(()=>{
        const updateViewSize = ()=>setViewSize({width: window.innerWidth - 1, height: window.innerHeight - 1});
        window.addEventListener('resize', updateViewSize);
        return()=>window.removeEventListener('resize', updateViewSize);
    })

    return (
        <div className="App">
            <TranslationContext.Provider value={translation}>
                <div className="view" id="view" style={viewSize}>
                    <div className="area">
                        <TypeArea/>
                        <TranslateArea/>
                    </div>
                    <Dial/>
                </div>
            </TranslationContext.Provider>
        </div>
  );
}

export default App;
