import { UserState } from "./UserTypes"
import { EthereumState } from "./EthereumTypes"

export interface RootSate {
  ethereum: EthereumState
  user: UserState
}
