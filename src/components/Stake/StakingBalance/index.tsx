import React, { FunctionComponent } from "react"
import { useSelector } from "react-redux"
import { RootSate } from "../../../redux/types/RootTypes"

import { useStakingTokenBalance } from "../../../hooks/useTokenDefi"
import { TYPE } from "../../../theme"
import { RowColumn } from "../../Row"

const StakingBalance: FunctionComponent = () => {
  const account = useSelector((state: RootSate) => state.ethereum.account)
  const { data: stakingBalance } = useStakingTokenBalance(account)

  return (
    <RowColumn>
      <TYPE.largeHeader>Staking balance</TYPE.largeHeader>
      <TYPE.amount>
        {!account && "Locked"}
        {!!account && !stakingBalance && "Loading..."}
        {!!account && stakingBalance && stakingBalance + " mDai"}
      </TYPE.amount>
    </RowColumn>
  )
}

export default StakingBalance
