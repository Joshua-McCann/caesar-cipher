import {useContext} from "react";
import TranslationContext from "../context/TranslationContext";

function TypeArea() {

    const translation = useContext(TranslationContext);

    return(
        <div className="text-holder" >
            <label htmlFor="type">Type Here:</label>
            <textarea id="type" onChange={(ev) => translation.setText(ev.target.value)} className="text-area" value={translation.text}> </textarea>
        </div>
    )
}

export default TypeArea