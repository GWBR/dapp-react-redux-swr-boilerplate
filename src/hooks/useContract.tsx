import { useMemo } from "react"
import { useSelector } from "react-redux"
import { Contract } from "@ethersproject/contracts"

import { RootSate } from "../redux/types/RootTypes"
import { getContract } from "../utils"
import { abi as TOKEN_DEFI_ABI, networks as TOKEN_DEFI_NETWORKS } from "../contracts/abis/TokenDefi.json"
import ERC20_ABI from "../constants/abis/erc20.json"
import { getTokenDefiAddress } from "../utils/addressHelper"

function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const ethereum = useSelector((state: RootSate) => state.ethereum)

  return useMemo(() => {
    if (!address || !ABI || !ethereum.ethers) return null
    try {
      return getContract(address, ABI, ethereum.ethers, withSignerIfPossible && ethereum.account ? ethereum.account : undefined)
    } catch (error) {
      console.error("Failed to get contract", error)
      return null
    }
  }, [address, ABI, withSignerIfPossible, ethereum])
}

export function useTokenDefiContract(): Contract | null {
  const ethereum = useSelector((state: RootSate) => state.ethereum)

  return useContract(ethereum.chainId ? getTokenDefiAddress(ethereum.chainId) : undefined, TOKEN_DEFI_ABI, true)
}

export function useERC20TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}
