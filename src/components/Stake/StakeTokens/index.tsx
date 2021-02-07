import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { useSelector } from "react-redux"

import { RootSate } from "../../../redux/types/RootTypes"

import { TYPE } from "../../../theme"

import { getDaiTokenAddress } from "../../../utils/addressHelper"
import useTokenBalance from "../../../hooks/useTokenBalance"
import { RowBetween } from "../../Row"

const StakeTokenContainer = styled(RowBetween)`
  margin-bottom: 15px;
`

const StakeTokens: FunctionComponent = () => {
  const ethereum = useSelector((state: RootSate) => state.ethereum)
  const { data: mDaiBalance } = useTokenBalance(getDaiTokenAddress(ethereum.chainId))

  return (
    <StakeTokenContainer>
      <TYPE.largeHeader>Stake tokens</TYPE.largeHeader>
      <TYPE.amountSmall>
        {!ethereum.account && "Locked"}
        {!!ethereum.account && !mDaiBalance && "Loading..."}
        {!!ethereum.account && mDaiBalance && "Balance: " + mDaiBalance}
      </TYPE.amountSmall>
    </StakeTokenContainer>
  )
}

export default StakeTokens
