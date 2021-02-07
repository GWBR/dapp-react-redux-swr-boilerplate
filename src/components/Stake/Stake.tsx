import React, { FunctionComponent, useCallback, useState } from "react"
import { useSelector } from "react-redux"
import { RootSate } from "../../redux/types/RootTypes"

import { ButtonPrimary } from "../Button"

import Container from "../Container"
import { useStakingTokenBalance, useTokenDefi } from "../../hooks/useTokenDefi"
import { ethers } from "ethers"
import StakingBalance from "./StakingBalance"
import styled from "styled-components"
import NumericalInput from "../NumericalInput"
import Rewards from "./Rewards"
import Row, { RowColumn } from "../Row"
import StakeTokens from "./StakeTokens"

const StakeContainer = styled.div`
  background-color: ${({ theme }) => theme.bgSecondary};
  margin: auto;
  padding: 24px;
  border-radius: 30px;
  max-width: 420px;
  width: 100%;
  box-shadow: 0 7px 30px -10px ${({ theme }) => theme.shadowPrimary};
`

const TokensContainer = styled(RowColumn)`
  margin-bottom: 10px;
`

const TokenContainer = styled(RowColumn)`
  margin-bottom: 15px;
`

const StakeButton = styled(ButtonPrimary)`
  margin-top: 20px;
  margin-bottom: 15px;
  width: 100%;
  padding: 15px;
`

const UnstakeButton = styled(Row)`
  color: ${({ theme }) => theme.textNeutralTiertiary};
  font-weight: 600;
  font-size: 15;
  cursor: pointer;
  justify-content: center;
`

const Stake: FunctionComponent = () => {
  const ethereum = useSelector((state: RootSate) => state.ethereum)

  const { stakeTokens, unStakeTokens } = useTokenDefi()
  const { data: stakingBalance } = useStakingTokenBalance(ethereum.account)

  async function handleStake() {
    if (toStake === "" || toStake === "0") {
      console.error("Tokens to stake needs to be > 0")
      return
    }

    const parsedToStake = ethers.utils.parseUnits(toStake, "ether")
    console.log(parsedToStake)
    console.log(await stakeTokens(parsedToStake))

    setToStake("0")
  }

  async function handleUnstake() {
    if (stakingBalance === "") {
      console.error("Your DAPP Balance is null.")
      return
    }

    await unStakeTokens()
  }

  const [toStake, setToStake] = useState<string>("")
  const onUserInput = useCallback((typedValue: string) => {
    setToStake(typedValue)
  }, [])

  return (
    <Container>
      <StakeContainer>
        <TokensContainer>
          <TokenContainer>
            <StakingBalance />
          </TokenContainer>
          <TokenContainer>
            <Rewards />
          </TokenContainer>
        </TokensContainer>
        <StakeTokens />

        <NumericalInput value={toStake} onUserInput={onUserInput} />
        <StakeButton onClick={handleStake}>Stake !</StakeButton>

        <UnstakeButton className="unstake" onClick={handleUnstake}>
          Unstake
        </UnstakeButton>
      </StakeContainer>
    </Container>
  )
}

export default Stake
