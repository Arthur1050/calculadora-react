import React, { Component } from "react";
// Importando o css descarta a necessidade de referenciar-lo no arquivo html
import './Calculator.css'

import Button from '../components/Button'
import Display from "../components/Display";

const initialState = {
    displayValue: '0',
    clearDisplay: false, // (Para indicar se precisa ou não limpar o display)
    operation: null,
    values: [0, 0],
    current: 0 // Indica qual índice do valor está sendo manipulado
}

// Criando um componente de classe pois usarei o estado(state)
// Export default exporta um objeto/classe podendo ser referenciado por qualquer nome na hora de importar
export default class Calculator extends Component {

    constructor(props) {
        super(props)

        // Cria uma propriedade "Calculator.clearMemory" e associa a função "ClearMemory" a ela
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    state = { ...initialState } // State recebe todas as chaves e valores de initialState

    // Criando função para zerar a calculadora
    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            try {
                values[0] = eval(`${this.state.values[0]} ${currentOperation} ${this.state.values[1]}`)
                if (isNaN(values[0]) || !isFinite(values[0])) {
                    this.clearMemory()
                return
                }
            } catch (e) {
                console.log(e)
                values[0] = this.state.values[0]
            }
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    // Função para adicionar digito
    addDigit(n) {
        // Se o user digitar "." já avendo esse digito no display, a ação será ignorada
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false })

        // Adicionando os valores ao state.value
        if (n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
        }
    }

    render() {
        return (
            // Ao invés de "class" (usado no html), no jsx referenciamos à classes por "className"
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={() => this.clearMemory()} triple />
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigit} />
                <Button label="8" click={this.addDigit} />
                <Button label="9" click={this.addDigit} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigit} />
                <Button label="5" click={this.addDigit} />
                <Button label="6" click={this.addDigit} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigit} />
                <Button label="2" click={this.addDigit} />
                <Button label="3" click={this.addDigit} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigit} double />
                <Button label="." click={this.addDigit} />
                <Button label="=" click={this.setOperation} operation />
            </div>
        )
    }
}