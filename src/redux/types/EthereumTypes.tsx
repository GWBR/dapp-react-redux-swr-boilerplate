export interface Ethereum {
  account: string | undefined
  chainId: number | undefined
  ethers: any | undefined
  provider: any | undefined
}

export enum EthereumActionTypes {
  ETHEREUM__SET_ETHEREUM = "ETHEREUM__SET_ETHEREUM",
  ETHEREUM__RESET_ETHEREUM = "ETHEREUM__RESET_ETHEREUM",
  ETHEREUM__SET_ACCOUNT = "ETHEREUM__SET_ACCOUNT",
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface EthereumState {
  readonly account: string | undefined
  readonly chainId: number | undefined
  readonly ethers: any | undefined
  readonly provider: any | undefined
}
