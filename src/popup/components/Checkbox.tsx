import React from 'react'
import styled, { css } from 'styled-components'

const Input = styled.input`
  display: none;
`

const Switch = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  border: 2px solid #e8e8e8;
  background-color: #d8d8d8;
  overflow: hidden;
  ${(props) => props.theme.transition('border-color', 'background-color')};

  ${(props) =>
    props.theme.type === 'dark' &&
    css`
      border-color: ${(props) => props.theme.color.text.faded};
      background-color: ${(props) => props.theme.color.background.normal};
    `}
`

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  transform: scaleX(0);
  transform-origin: left;
  background-color: #35d451;
  ${(props) => props.theme.transition('background-color', 'transform')};
`

const Indicator = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  width: 20px;
  height: 20px;
  background-color: #fff;
  box-shadow: 1px 1px 1px 0 rgba(0, 0, 0, 0.16);
  border-radius: 100%;
  ${(props) => props.theme.transition('transform')};
`

const Label = styled.label<{ checked: boolean }>`
  display: block;
  cursor: pointer;
  width: 38px;
  height: 24px;

  ${(props) =>
    props.checked &&
    css`
      ${Background} {
        transform: scaleX(0.9);
      }

      ${Indicator} {
        transform: translate(calc(50% + 4px), -50%);
      }
    `}
`

const Header: React.FC<{
  checked: boolean
  onChange: (state: boolean) => void
}> = ({ checked, onChange }) => {
  return (
    <Label checked={checked}>
      <Input
        checked={checked}
        type="checkbox"
        onChange={(event) => onChange(event.currentTarget.checked)}
      />
      <Switch>
        <Background />
        <Indicator />
      </Switch>
    </Label>
  )
}

export default Header
