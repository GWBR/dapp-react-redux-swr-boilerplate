import styled from "styled-components"
import { darken } from "polished"
import { Button as RebassButton } from "rebass/styled-components"

const Base = styled(RebassButton)`
  font-weight: 500;
  text-align: center;
  outline: none;
  border: 1px solid transparent;
  border-radius: 12px;
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  transition: background-color 0.15s ease, color 0.15s ease;
  &:disabled {
    cursor: auto;
  }
  > * {
    user-select: none;
  }
`

export const ButtonPrimary = styled(Base)`
  background-color: ${({ theme }) => theme.bgQuaternary};
  color: ${({ theme }) => theme.textQuaternary};
  font-weight: 800;
  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.bgQuaternary)};
    background-color: ${({ theme }) => darken(0.05, theme.bgQuaternary)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.bgQuaternary)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.bgQuaternary)};
    background-color: ${({ theme }) => darken(0.1, theme.bgQuaternary)};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.bgNeutralTiertiary};
    color: ${({ theme }) => theme.textNeutralTiertiary};
    cursor: auto;
    box-shadow: none;
    border: 1px solid transparent;
    outline: none;
  }
`

export const ButtonSecondary = styled(Base)`
  background-color: ${({ theme }) => theme.bgTiertiary};
  color: ${({ theme }) => theme.textTiertiary};
  &:hover {
    background-color: ${({ theme }) => darken(0.02, theme.bgTiertiary)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.bgTiertiary)};
    background-color: ${({ theme }) => darken(0.05, theme.bgTiertiary)};
  }
`

export const ButtonTiertiary = styled(Base)`
  background-color: ${({ theme }) => theme.bgNeutralPrimary};
  color: ${({ theme }) => theme.textNeutralPrimary};
  &:hover {
    background-color: ${({ theme }) => theme.bgNeutralSecondary};
  }
  &:active {
    outline: 0;
    background-color: ${({ theme }) => darken(0.1, theme.bgNeutralSecondary)};
  }
`
