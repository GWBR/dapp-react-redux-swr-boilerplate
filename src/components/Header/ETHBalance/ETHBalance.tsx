import React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"

import { useETHBalance } from "../../../hooks/useEthereum"

import { RootSate } from "../../../redux/types/RootTypes"

import { ButtonTiertiary } from "../../Button"

import { ReactComponent as LoadingSVG } from "../../../assets/loading.svg"

const BalanceButton = styled(ButtonTiertiary)`
  height: 38px;
  padding: 0.5rem;
  border-radius: 0.5rem;

  svg {
    width: auto;
    height: 100%;
    stroke: #f72585;
    stroke-width: 5;
  }
`

function ETHBalance(): JSX.Element {
  const ethereum = useSelector((state: RootSate) => state.ethereum)
  const { data: balance } = useETHBalance(ethereum.account)

  if (!balance) {
    return (
      <BalanceButton>
        <LoadingSVG />
      </BalanceButton>
    )
  }

  return <BalanceButton>{parseFloat(balance).toFixed(3)} ETH</BalanceButton>
}

export default ETHBalance
