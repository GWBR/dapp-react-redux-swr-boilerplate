import React from "react"
import { darken } from "polished"

import styled from "styled-components"
import { NavLink } from "react-router-dom"
import { Moon, Sun } from "react-feather"

import Logo from "../../assets/logo/Logo.svg"
import LogoDark from "../../assets/logo/LogoDark.svg"

import { useDarkModeManager } from "../../hooks/useUser"
import Row, { RowFixed } from "../Row"
import { ButtonTiertiary } from "../Button"
import Account from "./Account"

const HeaderFrame = styled.header`
  display: flex;
  padding: 1rem;
  flex-flow: row nowrap;
  width: 100%;
  justify-content: space-between;
`

const HeaderRow = styled(RowFixed)`
  ${({ theme }) => theme.mediaWidth.upToMedium`
  width: 100%
  `}
`

const HomeLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;

  img {
    height: 24px;
  }
`

const HeaderLinks = styled(Row)`
  justify-content: center;
`

const activeClassName = "active"
const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  text-decoration: none;
  padding: 0px 10px;
  color: ${({ theme }) => theme.textPrimary};
  font-weight: 500;

  &.${activeClassName} {
    color: ${({ theme }) => theme.textPrimary};
    font-weight: 600;
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.textPrimary)};
  }
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    flex-direction: row;
    justify-content: space-between;
    justify-self: center;
    width: 100%;
    max-width: 960px;
    padding: 1rem;
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    z-index: 99;
    height: 72px;
    border-radius: 12px 12px 0 0;
    background-color: ${({ theme }) => theme.bgSecondary};
  `};
`

const StyledMenuButton = styled(ButtonTiertiary)`
  justify-content: center;
  height: 38px;
  margin-left: 8px;
  padding: 0.5rem;
  border-radius: 0.5rem;
  svg {
    stroke: ${({ theme }) => theme.textNeutralPrimary};
    height: 100%;
    width: auto;
  }
`
const Header = () => {
  const { darkMode, toggleDarkMode } = useDarkModeManager()

  return (
    <HeaderFrame>
      <HeaderRow>
        <HomeLink to={"/"}>
          <img alt="Theme" src={darkMode ? LogoDark : Logo} />
        </HomeLink>
        <HeaderLinks>
          <StyledNavLink to={"/stake"}>Stake</StyledNavLink>
          <StyledNavLink to={"/about"}>About</StyledNavLink>
        </HeaderLinks>
      </HeaderRow>
      <HeaderControls>
        <Account />
        <StyledMenuButton onClick={toggleDarkMode}>{darkMode ? <Moon /> : <Sun />}</StyledMenuButton>
      </HeaderControls>
    </HeaderFrame>
  )
}

export default Header
