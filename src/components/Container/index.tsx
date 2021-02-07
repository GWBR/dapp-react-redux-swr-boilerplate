import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 100px;
  padding-bottom: 100px;
  -webkit-box-align: center;
  align-items: center;
  flex: 1 1 0%;
  overflow: hidden auto;
  z-index: 1;

  ${({ theme }) => theme.mediaWidth.upToMedium`
  padding: 2rem 16px 16px;
  `};
`

export default Container
