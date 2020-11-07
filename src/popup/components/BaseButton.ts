import styled from 'styled-components'

const BaseButton = styled.button`
  border: 0;
  padding: 0;
  cursor: pointer;
  outline: none;
  background: none;

  &:hover,
  &:focus,
  &:active {
    outline: none;
  }
`

export default BaseButton
