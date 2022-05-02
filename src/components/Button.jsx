import React from "react";
import './Button.css'

// Agora criando um componente funcional já que não usarei o estado(state)
export default props => {
    let classes = 'button '
    //Se a propriedade "operation" for passado na declarassão do componente, a sua respectiva classe será adicionada
    classes += props.operation ? 'operation ' : '' 
    classes += props.double ? 'double ' : ''
    classes += props.triple ? 'triple ' : ''

    return (
        // Sempre que houver uma expressão em {} no jsx, significa que dentro dele pode ser adicionado código javascript
        <button 
            // Evento desparado quando um botão for clickado invocando a função "Click()" e passando como parametro o valor do label
            onClick={e => props.click /*Para desparar só quando a função estiver presente*/ && props.click(props.label)} 
            className={classes} >
            {props.label}
        </button>
    )
}