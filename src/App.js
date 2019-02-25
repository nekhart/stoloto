import React, { Component } from 'react';
import './App.css';
import LottoDialog from "./components/lotto/lotto-dialog";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import 'normalize.css'

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    props: {
        MuiButtonBase: {
            disableRipple: true
        }
    }
});

class App extends Component {
    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div className="App">
                    <h1>Stoloto</h1>
                    <LottoDialog/>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default App;
