import { useSelector } from "react-redux"
import { Contract } from "@ethersproject/contracts"

import { RootSate } from "../redux/types/RootTypes"
import useSWR, { responseInterface } from "swr"
import { useKeepSWRDataLiveAsBlocksArrive } from "./useEthereum"
import { BigNumber, ethers } from "ethers"
import { useERC20TokenContract, useTokenDefiContract } from "./useContract"
import { getDaiTokenAddress } from "../utils/addressHelper"

function getStakingBalance(tokenDefiContract: Contract, address: string): string {
  return tokenDefiContract.stakingBalance(address).then((bal: BigNumber) => ethers.utils.formatEther(bal.toString()))
}

export function useTokenDefi() {
  const ethereum = useSelector((state: RootSate) => state.ethereum)
  const tokenDefiContract = useTokenDefiContract()
  const mDaiContract = useERC20TokenContract(getDaiTokenAddress(ethereum.chainId))

  async function stakeTokens(tokens: BigNumber) {
    await mDaiContract?.approve(tokenDefiContract?.address, tokens)
    return await tokenDefiContract?.stakeTokens(tokens)
  }

  async function unStakeTokens() {
    return await tokenDefiContract?.unStakeTokens()
  }

  async function isStaking(address: string) {
    return await tokenDefiContract?.isStaking(address)
  }

  return { stakeTokens, unStakeTokens, isStaking }
}

export function useStakingTokenBalance(address: string | undefined, suspense = false): responseInterface<string, any> {
  const tokenDefiContract = useTokenDefiContract()
  const ethereum = useSelector((state: RootSate) => state.ethereum)
  const shouldFetch = typeof ethereum.chainId === "number" && typeof address === "string" && !!ethereum.ethers && !!tokenDefiContract

  const result = useSWR(shouldFetch ? [tokenDefiContract, address] : null, getStakingBalance)
  useKeepSWRDataLiveAsBlocksArrive(result.mutate)

  return result
}
