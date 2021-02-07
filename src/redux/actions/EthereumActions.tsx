import { EthereumActionTypes, Ethereum } from "../types/EthereumTypes"

export const ETHEREUM__SET_ETHEREUM = (ethereum: Ethereum) => ({ type: EthereumActionTypes.ETHEREUM__SET_ETHEREUM, ethereum })
export const ETHEREUM__RESET_ETHEREUM = () => ({ type: EthereumActionTypes.ETHEREUM__RESET_ETHEREUM })
export const ETHEREUM__SET_ACCOUNT = (account: string) => ({ type: EthereumActionTypes.ETHEREUM__SET_ACCOUNT, account })
