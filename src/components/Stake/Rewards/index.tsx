import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import { RootSate } from "../../../redux/types/RootTypes"

import { TYPE } from "../../../theme"

import { getDappTokenAddress } from "../../../utils/addressHelper"
import useTokenBalance from "../../../hooks/useTokenBalance"

const StakingBalance: FunctionComponent = () => {
  const ethereum = useSelector((state: RootSate) => state.ethereum)
  const { data: dappBalance } = useTokenBalance(getDappTokenAddress(ethereum.chainId))

  return (
    <>
      <TYPE.largeHeader>Rewards</TYPE.largeHeader>
      <TYPE.amount>
        {!ethereum.account && "Locked"}
        {!!ethereum.account && !dappBalance && "Loading..."}
        {!!ethereum.account && dappBalance && dappBalance + " dApp"}
      </TYPE.amount>
    </>
  )
}

export default StakingBalance
