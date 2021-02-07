import { useSelector } from "react-redux"
import { Contract } from "@ethersproject/contracts"

import { RootSate } from "../redux/types/RootTypes"
import useSWR from "swr"
import { useKeepSWRDataLiveAsBlocksArrive } from "./useEthereum"
import { BigNumber, ethers } from "ethers"
import { useERC20TokenContract } from "./useContract"

function getTokenBalance(contract: Contract, address: string): string {
  return contract.balanceOf(address).then((balance: BigNumber) => ethers.utils.formatEther(balance.toString()))
}

function useTokenBalance(tokenAddress: string) {
  const ethereum = useSelector((state: RootSate) => state.ethereum)
  const tokenContract = useERC20TokenContract(tokenAddress, true)

  const shouldFetch = typeof tokenAddress === "string" && !!tokenContract

  const result = useSWR(shouldFetch ? [tokenContract, ethereum.account] : null, getTokenBalance)

  useKeepSWRDataLiveAsBlocksArrive(result.mutate)

  return result
}

export default useTokenBalance
