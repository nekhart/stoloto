import { combineReducers } from 'redux'
import lottoReducer, { moduleName as lottoModule } from '../ducks/lotto'

export default combineReducers({
    [lottoModule]: lottoReducer
})
