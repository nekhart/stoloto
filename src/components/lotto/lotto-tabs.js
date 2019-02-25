import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { tabsDataSelector, activeTabNameSelector, changeActiveTab } from '../../ducks/lotto'
import PropTypes from 'prop-types'

class LottoTabs extends Component {
    static propTypes = {
        activeTabName: PropTypes.string,
        tabs: PropTypes.array
    }

    static defaultProps = {
        activeTabName: '',
        tabs: []
    }

    onTabBtnClick = (event, tabName) => {
        this.props.onTabChange && this.props.onTabChange(tabName)
    }

    render() {
        return (
            <Fragment>
                <ul className="tab-container">
                {
                    this.props.tabs.map((tab, i) => (
                        <li key={i}
                            className={
                                "tab-rectangle" +
                                (
                                    tab.name === this.props.activeTabName ?
                                        " active" :
                                        (tab.isDirty ? " dirty" : "")
                                )}
                            onClick={(e) => (this.onTabBtnClick(e, tab.name))}> {tab.name} </li>
                    ))
                }
                </ul>
            </Fragment>
        )
    }
}

export default connect(
    (state) => ({
        activeTabName: activeTabNameSelector(state),
        tabs: tabsDataSelector(state)
    }),
    { onTabChange: changeActiveTab }
)(LottoTabs)