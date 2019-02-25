import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

const numbers = new Array(20).fill(0).map((item, i) => i+1)

class LottoField extends Component {
    static propTypes = {
        value: PropTypes.array
    }

    static defaultProps = {
        value: []
    }

    onChangeSelection = val => (event) => {
        let newVal = this.props.value.slice(),
            valIndex = newVal.indexOf(val)
        if (valIndex === -1) {
            newVal.push(val)
        }
        else {
            newVal.splice(valIndex, 1)
        }
        event.target.value = newVal
        this.props.onChange && this.props.onChange(event)
    }

    render() {
        return (
            <Fragment>
                <div className="lotto-field-header">
                    Отметьте не менее 4 чисел в первой части поля
                </div>
                <div className="lotto-field">
                    {
                        numbers.map((item) => (
                            <div
                                key={item}
                                className={"lotto-field-number" + (this.props.value.indexOf(item) !== -1 ? " active" : "")}
                                onClick={this.onChangeSelection(item)}
                            > {item} </div>
                        ))
                    }
                </div>
            </Fragment>
        )
    }
}

export default LottoField