import {useCallback, useContext, useEffect, useState} from "react";
import TranslationContext from "../context/TranslationContext";

function TranslateArea() {

    const [message, setMessage] = useState('');
    const translation = useContext(TranslationContext);

    const alBhed = ['E', 'P', 'S', 'T', 'I', 'W', 'K', 'N', 'U', 'V', 'G', 'C', 'L', 'R', 'Y', 'B', 'X', 'H', 'M', 'D', 'O', 'F', 'Z', 'Q', 'A', 'J', 'e', 'p', 's', 't', 'i', 'w', 'k', 'n', 'u', 'v', 'g', 'c', 'l', 'r', 'y', 'b', 'x', 'h', 'm', 'd', 'o', 'f', 'z', 'q', 'a', 'j'];
    const bhedAl = ['Y', 'P', 'L', 'T', 'A', 'V', 'K', 'R', 'E', 'Z', 'G', 'M', 'S', 'H', 'U', 'B', 'X', 'N', 'C', 'D', 'I', 'J', 'F', 'Q', 'O', 'W', 'y', 'p', 'l', 't', 'a', 'v', 'k', 'r', 'e', 'z', 'g', 'm', 's', 'h', 'u', 'b', 'x', 'n', 'c', 'd', 'i', 'j', 'f', 'q', 'o', 'w']

    const translateAlBhed = useCallback((toAlBhed, char) =>  {
        const value = char.charCodeAt(0);
        const array = toAlBhed ? alBhed : bhedAl;
        if (value > 64 && value < 91){
            char = array[value - 65];
        }
        else if (value > 96 && value < 123) {
            char = array[value - 71]
        }
        return char;
    },[alBhed, bhedAl]);

    const translate = useCallback((char) => {
        let value = char.charCodeAt(0);
        const move = parseInt(translation.offset);
        if (value > 64 && value < 91){
            value += move;
            if (value > 90) value -= 26;
            char = String.fromCharCode(value);
        }
        else if (value > 96 && value < 123) {
            value += move
            if (value > 122) value -= 26;
            char = String.fromCharCode(value);
        }
        return char;
    },[translation.offset]);

    useEffect(()=>{
        const charArray = [...translation.text]
        if (isNaN(translation.offset)) {
            setMessage(charArray.map(i => translateAlBhed(translation.offset === 'AB', i)).join(''));
        } else {
            setMessage(charArray.map(translate).join(''));
        }
    },[translation.text, translation.offset, translateAlBhed, translate])

    return(
        <div className="text-holder">
            <label htmlFor="translate">Translation:</label>
            <textarea id="translate" className="text-area" readOnly value={message}/>
        </div>
    )
}

export default TranslateArea