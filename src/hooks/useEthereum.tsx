import { useCallback, useEffect, useRef } from "react"
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers"
import { useDispatch, useSelector } from "react-redux"
import { RootSate } from "../redux/types/RootTypes"
import { BigNumber, ethers } from "ethers"
import useSWR, { responseInterface } from "swr"
import { EthereumActionTypes } from "../redux/types/EthereumTypes"

declare global {
  interface Window {
    ethereum: any
    web3: any
  }
}

export enum DataType {
  BlockNumber,
  ETHBalance,
  StakingBalance,
  TokenBalance,
}

export const useEthereum = () => {
  const ethereum = useSelector((state: RootSate) => state.ethereum)
  const dispatch = useDispatch()

  async function connectToInjected() {
    let provider = null
    if (window.ethereum) {
      provider = window.ethereum
      try {
        await provider.request({ method: "eth_requestAccounts" })
      } catch (error) {
        console.error("User Rejected")
      }
    } else if (window.web3) {
      provider = window.web3.currentProvider
    } else {
      console.error("No Web3 Provider found")
    }

    return provider
  }

  async function getAccount(ethers: Web3Provider) {
    const signer: JsonRpcSigner = await ethers.getSigner()
    const account = await signer.getAddress()

    return account
  }

  async function getChainId(ethers: Web3Provider) {
    const network = await ethers.getNetwork()
    const chainId = network.chainId

    return chainId
  }

  async function initEthers(provider: any) {
    const ethers = new Web3Provider(provider, "any")
    return ethers
  }

  async function onConnect() {
    try {
      const provider = await connectToInjected()
      await subscribeProvider(provider)

      const ethers: Web3Provider = await initEthers(provider)
      const account = await getAccount(ethers)
      const chainId = await getChainId(ethers)

      const ethereum = {
        account: account,
        chainId: chainId,
        ethers: ethers,
        provider: provider,
      }

      dispatch({ type: EthereumActionTypes.ETHEREUM__SET_ETHEREUM, ethereum: ethereum })

      localStorage.setItem("IS_PROVIDER_CACHED", "true")
    } catch (err) {
      console.error(err)
    }
  }

  async function subscribeProvider(provider: any) {
    if (!provider) return

    provider.on("accountsChanged", (accounts: string[]) => {
      handleAccountChange(accounts)
    })

    provider.on("chainChanged", () => {
      handleChainChanged()
    })
  }

  async function handleAccountChange(accounts: string[]) {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      localStorage.removeItem("IS_PROVIDER_CACHED")
      dispatch({ type: EthereumActionTypes.ETHEREUM__RESET_ETHEREUM })
    } else if (accounts[0] !== ethereum.account) {
      dispatch({ type: EthereumActionTypes.ETHEREUM__SET_ACCOUNT, account: accounts[0] })

      // Do any other work!
    }
  }

  function handleChainChanged() {
    window.location.reload()
  }

  return { onConnect }
}

function getBlockNumber(library: Web3Provider): Promise<number> {
  return library.getBlockNumber()
}

export function useBlockNumber(): responseInterface<number, any> {
  const ethereum = useSelector((state: RootSate) => state.ethereum)
  const shouldFetch = !!ethereum.ethers ? true : false
  return useSWR(shouldFetch ? ethereum.ethers : null, getBlockNumber, {
    refreshInterval: 10 * 1000,
  })
}

export function useKeepSWRDataLiveAsBlocksArrive(mutate: responseInterface<any, any>["mutate"]): void {
  // because we don't care about the referential identity of mutate, just bind it to a ref
  const mutateRef = useRef(mutate)
  useEffect(() => {
    mutateRef.current = mutate
  })
  // then, whenever a new block arrives, trigger a mutation
  const { data } = useBlockNumber()
  useEffect(() => {
    mutateRef.current()
  }, [data])
}

function getETHBalance(library: Web3Provider, account: string): Promise<string> {
  return library.getBalance(account).then((balance: BigNumber) => ethers.utils.formatEther(balance.toString()))
}

export function useETHBalance(account?: string | undefined, suspense = false): responseInterface<string, any> {
  const ethereum = useSelector((state: RootSate) => state.ethereum)
  const shouldFetch = typeof ethereum.chainId === "number" && typeof account === "string" && !!ethereum.ethers

  const result = useSWR(shouldFetch ? [ethereum.ethers, account] : null, getETHBalance)
  useKeepSWRDataLiveAsBlocksArrive(result.mutate)

  return result
}
