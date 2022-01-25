import Dial from "./components/Dial";
import {useState} from "react";
import TranslationContext from "./context/TranslationContext";
import TypeArea from "./components/TypeArea";
import TranslateArea from "./components/TranslateArea";

function App() {

    const [offset, setOffset] = useState('00');
    const [text, setText] = useState('');

    const translation = { offset, setOffset, text, setText };

    return (
        <div className="App">
            <TranslationContext.Provider value={translation}>
                <div className="view" id="view">
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
