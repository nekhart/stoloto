import React, { Component, Fragment } from 'react'

import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {isValidActiveTabSelector, totalCostSelector, stageCountSelector, lottoStageSelector,
    setStageCount, setLottoStage} from "../../ducks/lotto";
import {connect} from "react-redux";


class LottoStage extends Component {

    changeStage = (event) => {
        this.props.setLottoStage(event.target.value)
    }

    changeStageCount = (event) => {
        this.props.setStageCount(event.target.value)
    }

    render() {
        return (
            <Fragment>
            <div className="lotto-stage">
                <p className="lotto-label"> Тираж </p>
                <Select
                    style={{ width: '106px' }}
                    value={this.props.lottoStage}
                    onChange={this.changeStage}
                    displayEmpty
                    name="stage"
                    className="lotto-select"
                >
                    <MenuItem value={1291}>№ 1291</MenuItem>
                    <MenuItem value={1292}>№ 1292</MenuItem>
                    <MenuItem value={1293}>№ 1293</MenuItem>
                    <MenuItem value={1294}>№ 1294</MenuItem>
                </Select>
                <p className="lotto-label"> 6 мая 10:30 </p>
                <p className="lotto-label" style={{ marginTop: '16px' }}> Кол-во тиражей: </p>
                <Select
                    style={{ width: '74px', marginLeft: '6px' }}
                    value={this.props.stageCount}
                    onChange={this.changeStageCount}
                    displayEmpty
                    name="stage"
                    className="lotto-select"
                >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                </Select>
                <p className="lotto-label"> Стоимость ставки: </p>
                <p className="lotto-label bet-cost"> {this.props.totalCost} </p>
                <p className="lotto-label"> рублей </p>
            </div>
            <Button style={{ marginTop: '117px' }} variant="contained" className="control-btn" disabled={!this.props.isValidActiveTab}>
                Подтвердить
            </Button>
            </Fragment>
        )
    }
}

export default connect(
    (state) => ({
        stageCount: stageCountSelector(state),
        totalCost: totalCostSelector(state),
        lottoStage: lottoStageSelector(state),
        isValidActiveTab: isValidActiveTabSelector(state)
    }),
    { setStageCount, setLottoStage }
)(LottoStage)