import React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { RootSate } from "../../../redux/types/RootTypes"
import { ButtonSecondary, ButtonTiertiary } from "../../Button"
import Row from "../../Row"
import ETHBalance from "../ETHBalance/ETHBalance"

import { getSignificantAddress } from "../../../utils"

import MetamaskFoxSVG from "../../../assets/MetaMask_Fox.svg"
import { useEthereum } from "../../../hooks/useEthereum"

const AccountRow = styled(Row)``

const ConnectToWalletButton = styled(ButtonSecondary)`
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  height: 38px;
  width: fit-content;
`

const Address = styled(ButtonTiertiary)`
  height: 38px;
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin-left: 8px;

  img {
    margin-right: 8px;
    height: 100%;
  }
`

const Account = () => {
  const ethereum = useSelector((state: RootSate) => state.ethereum)
  const { onConnect } = useEthereum()

  return (
    <AccountRow>
      {/* Connected Account */}
      {!!ethereum.account && (
        <>
          <ETHBalance />
          <Address width="fit-content">
            <img alt="Metamask" src={MetamaskFoxSVG} /> {getSignificantAddress(ethereum.account, 4)}
          </Address>
        </>
      )}

      {/* Not connected account */}
      {!ethereum.account && <ConnectToWalletButton onClick={() => onConnect()}>Connect to a wallet</ConnectToWalletButton>}
    </AccountRow>
  )
}

export default Account
