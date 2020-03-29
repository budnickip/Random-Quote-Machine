import React from 'react';

const Button = ({clickHandler}) =>{

    return(
        <button id="new-quote" className="button" onClick={clickHandler}>New quote</button>
    );
}

export default Button;