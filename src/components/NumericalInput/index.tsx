import React from "react"
import styled from "styled-components"
import { escapeRegExp } from "../../utils"

const StyledInput = styled.input<{ isError: boolean; align?: string; fontSize?: string }>`
  color: ${({ isError, theme }) => (isError ? theme.textError : theme.textPrimary)};
  width: 100%;
  font-weight: 400;
  outline: none;
  border: none;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.bgPrimary};
  font-size: ${({ fontSize }) => fontSize ?? "18px"};
  text-align: ${({ align }) => align && align};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 8px;
  -webkit-appearance: textfield;
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  [type="number"] {
    -moz-appearance: textfield;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  ::placeholder {
    color: ${({ theme }) => theme.textNeutralTiertiary};
  }
`

type NumericalInputType = {
  value: string
  onUserInput: (input: string) => void
  isError?: boolean
  fontSize?: string
}

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group

const NumericalInput = ({ value, onUserInput, isError = false, fontSize }: NumericalInputType) => {
  const enforcer = (nextUserInput: string) => {
    if (nextUserInput === "" || inputRegex.test(escapeRegExp(nextUserInput))) {
      onUserInput(nextUserInput)
    }
  }

  return (
    <StyledInput
      fontSize={fontSize}
      isError={isError}
      placeholder="0.0"
      value={value}
      onChange={(event) => {
        // replace commas with periods
        enforcer(event.target.value.replace(/,/g, "."))
      }}
      pattern="^[0-9]*[.,]?[0-9]*$"
      minLength={1}
      maxLength={79}
      spellCheck="false"
    />
  )
}

export default NumericalInput
