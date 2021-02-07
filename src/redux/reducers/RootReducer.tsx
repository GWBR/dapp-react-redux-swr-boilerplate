import { combineReducers } from "redux"
import ethereumReducer from "./EthereumReducer"
import userReducer from "./UserReducer"

const rootReducer = combineReducers({
  ethereum: ethereumReducer,
  user: userReducer,
})

export default rootReducer
