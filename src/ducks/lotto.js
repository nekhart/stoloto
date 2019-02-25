import { appName } from '../config'

/**
 * Constants
 * */

export const moduleName = 'lotto'
const prefix = `${appName}/${moduleName}`
export const CHANGE_GAME_ZONE_SELECT = `${prefix}/CHANGE_GAME_ZONE_SELECT`
export const CHANGE_ACTIVE_TAB = `${prefix}/CHANGE_ACTIVE_TAB`
export const RESET_SELECTION = `${prefix}/RESET_SELECTION`
export const SET_RANDOM_NUMBERS = `${prefix}/SET_RANDOM_NUMBERS`
export const SET_STAGE_COUNT = `${prefix}/SET_STAGE_COUNT`
export const SET_LOTTO_STAGE = `${prefix}/SET_LOTTO_STAGE`

/**
 * Reducer
 * */


const tabs = 'АБВГДЕЖЗИК'.split(''),
    betCost = 100

const initialState = {
    activeTabName: tabs[0],
    isValid: false,
    totalCost: 0,
    stageCount: 1,
    lottoStage: 1291,
    tabsData: tabs.map((item) => (
        {
            name: item,
            lottoTickets: [ [], [] ],
            isDirty: false,
            isValid: false,
            cost: 0
        }
    ))
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case CHANGE_GAME_ZONE_SELECT:
            const newTabsData = state.tabsData.map((item) => {
                    if (item.name === state.activeTabName) {
                        const newLottoTickets = item.lottoTickets.map((ticket, i) => (
                                i === payload.ticketIndex ? payload.selectedValues : ticket
                            ))
                        return getNewTabState(item, newLottoTickets)
                    } else return item
                })
            return getNewState(state, newTabsData)
        case CHANGE_ACTIVE_TAB:
            return {...state, activeTabName: payload.activeTabName}
        case RESET_SELECTION:
            return {...state, tabsData: initialState.tabsData}
        case SET_RANDOM_NUMBERS:
            const tabsData = state.tabsData.map((item) => {
                    if (item.name === state.activeTabName) {
                        return getNewTabState(item, [getRandomNumbers(), getRandomNumbers()])
                    }
                    else return item
                })
            return getNewState(state, tabsData)
        case SET_STAGE_COUNT:
            return {
                ...state,
                stageCount: payload,
                totalCost: getTotalCost(payload, state.tabsData)
            }
        case SET_LOTTO_STAGE:
            return {...state, lottoStage: payload}
        default:
            return state
  }

}

const getNewState = (state, tabsData) => (
    {
        ...state,
        tabsData: tabsData,
        isValid: tabsData.every(item => item.isValid),
        totalCost: getTotalCost(state.stageCount, tabsData)
    }
)

const getNewTabState = (tab, lottoTickets) => {
    const isValid = lottoTickets.every(ticket => ticket.length >= 4);
    return {
        ...tab,
        lottoTickets: lottoTickets,
        isDirty: lottoTickets.some(ticket => !!ticket.length),
        isValid: isValid,
        cost: isValid ? betCost : 0
    }
}

const getTotalCost = (stageCount, tabsData) => (
    stageCount * tabsData.reduce((sum, tab) => ( sum + tab.cost ), 0)
)

const getRandomNumbers = () => {
    const rndArr = [],
        getRndMod20 = () => (
            Math.round(Math.random() * 100) % 20 + 1
        )
    return new Array(4).fill(0).map(() => {
        let rndVal = getRndMod20();
        while (rndArr.indexOf(rndVal) !== -1) {
            rndVal = getRndMod20()
        }
        rndArr.push(rndVal)
        return rndVal
    })
}


/**
 * Selectors
 * */

export const stateSelector = (state) => state[moduleName]
export const stageCountSelector = (state) => stateSelector(state)['stageCount']
export const lottoStageSelector = (state) => stateSelector(state)['lottoStage']
export const totalCostSelector = (state) => stateSelector(state)['totalCost']
export const activeTabNameSelector = (state) => stateSelector(state)['activeTabName']
export const tabsDataSelector = (state) => stateSelector(state)['tabsData']
export const activeTabDataSelector = (state) => tabsDataSelector(state).find((tabData) => (tabData.name === activeTabNameSelector(state)))
export const isValidActiveTabSelector = (state) => activeTabDataSelector(state)['isValid']



/**
 * Action Creators
 * */

export const changeGameZoneSelect = (params) => ({
    type: CHANGE_GAME_ZONE_SELECT,
    payload: {
        ticketIndex: params.ticketIndex,
        selectedValues: params.selectedValues
    }
})

export const changeActiveTab = (params) => ({
    type: CHANGE_ACTIVE_TAB,
    payload: {
        activeTabName: params
    }
})

export const resetSelection = () => ({ type: RESET_SELECTION })

export const setRandomNumbers = () => ({ type: SET_RANDOM_NUMBERS })

export const setStageCount = (val) => ({ type: SET_STAGE_COUNT, payload: val })
export const setLottoStage = (val) => ({ type: SET_LOTTO_STAGE, payload: val })



/**
 *   Side Effects
 * */
