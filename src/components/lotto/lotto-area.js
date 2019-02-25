import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { activeTabDataSelector, changeGameZoneSelect, resetSelection, setRandomNumbers } from '../../ducks/lotto'
import LottoField from './lotto-field'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';


class LottoArea extends Component {

    onGameZoneSelectChange = ticketIndex => (event) => {
        this.props.changeGameZoneSelect({
            ticketIndex: ticketIndex,
            selectedValues: event.target.value
        })
    }

    render() {
        return (
            <Fragment>
                <div>
                {
                    this.props.tabData.lottoTickets.map((ticket, i) => (
                        <LottoField key={i} value={ticket} onChange={this.onGameZoneSelectChange(i)} />
                    ))
                }
                </div>
                <div className="lotto-area-control">
                    <Button variant="outlined" className="default lotto-area-control-btn" onClick={this.props.setRandomNumbers}> Случайные числа </Button>
                    <Button variant="outlined" className="default outlined-btn" onClick={this.props.resetSelection}>
                        <Icon style={{ fontWeight: 'bold' }}>close</Icon>
                        Очистить
                    </Button>
                </div>
            </Fragment>
        )
    }
}

export default connect(
    (state) => ({
        tabData: activeTabDataSelector(state)
    }),
    { changeGameZoneSelect, resetSelection, setRandomNumbers }
)(LottoArea)