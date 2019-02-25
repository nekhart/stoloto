import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import LottoArea from './lotto-area'
import LottoTabs from './lotto-tabs'
import LottoStage from "./lotto-stage";

import './lotto-styles.scss'
import lottoImg from './4_20x2.png'

class PaperComponent extends Component {
    render() {
        return <Paper className="lotto-dialog-paper-component"> {this.props.children} </Paper>
    }
}

class LottoDialog extends Component {

    state = {
        isOpenDialog: false
    };

    showDialog = () => {
        this.setState({ isOpenDialog: true });
    };

    hideDialog = () => {
        this.setState({ isOpenDialog: false });
    };

    render() {
        return (
            <div>
                <Button
                    onClick={this.showDialog}
                    variant="contained"
                    className="default"
                >
                    Lotto
                </Button>

                <Dialog
                    open={this.state.isOpenDialog}
                    onClose={this.hideDialog}
                    scroll="body"
                    aria-labelledby="scroll-dialog-title"
                    className="lotto-dialog"
                    PaperComponent={PaperComponent}
                >
                    <DialogTitle className="lotto-dialog-header">
                        <LottoTabs />
                    </DialogTitle>

                    <DialogContent className="lotto-dialog-content">
                        <div className="col-left">
                            <img className="lotto-img" src={lottoImg} alt="" />
                            <h3> «Гослото «4 из 20» </h3>
                            <button className="lotto-rules-btn">
                                Правила
                            </button>
                            <h3 className="super-prize-header"> Суперприз </h3>
                            <h1 className="super-prize-amount"> 300 000 000 </h1>
                            <h3> рублей </h3>
                            <div className="lotto-description">
                                <p >
                                    Чтобы принять участие в лотерее, вы должны выбрать числа сразу в двух игровых полях.
                                </p>
                                <p >
                                    Минимальная лотерейная комбинация —
                                    это 4 числа в диапазоне от 1 до 20 в первом поле и 4 числа от 1 до 20 во втором поле.
                                </p>
                            </div>
                        </div>
                        <div className="col-right">
                            <Button variant="contained" className="control-btn" onClick={this.hideDialog}>
                                <Icon style={{ fontWeight: 'bold', marginRight: '7px' }}>close</Icon> Выход
                            </Button>
                            <LottoStage />
                        </div>
                        <div className="col-center">
                            <LottoArea />
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}

export default LottoDialog;
