import { Reducer } from "redux"
import { EthereumState, EthereumActionTypes } from "../types/EthereumTypes"

const initialState: EthereumState = {
  account: undefined,
  chainId: undefined,
  ethers: undefined,
  provider: undefined,
}

const ethereumReducer: Reducer<EthereumState> = (state = initialState, action) => {
  switch (action.type) {
    case EthereumActionTypes.ETHEREUM__SET_ETHEREUM: {
      return { ...action.ethereum }
    }
    case EthereumActionTypes.ETHEREUM__RESET_ETHEREUM: {
      return { ...initialState }
    }
    case EthereumActionTypes.ETHEREUM__SET_ACCOUNT: {
      return { ...state, account: action.account }
    }
    default: {
      return state
    }
  }
}

export default ethereumReducer
