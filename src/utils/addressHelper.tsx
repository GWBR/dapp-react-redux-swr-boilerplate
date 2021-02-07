import { networks as TOKEN_DAI_NETWORKS } from "../contracts/abis/DaiToken.json"
import { networks as TOKEN_DAPP_NETWORKS } from "../contracts/abis/DappToken.json"
import { networks as TOKEN_DEFI_NETWORKS } from "../contracts/abis/TokenDefi.json"

export function getDaiTokenAddress(chainId: number | undefined): string {
  if (!chainId || chainId !== 1337) return ""
  return TOKEN_DAI_NETWORKS[chainId].address
}

export function getDappTokenAddress(chainId: number | undefined): string {
  if (!chainId || chainId !== 1337) return ""
  return TOKEN_DAPP_NETWORKS[chainId].address
}

export function getTokenDefiAddress(chainId: number | undefined): string {
  if (!chainId || chainId !== 1337) return ""

  return TOKEN_DEFI_NETWORKS[chainId].address
}
