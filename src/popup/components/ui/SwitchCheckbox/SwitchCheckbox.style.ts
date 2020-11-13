import styled, { css } from 'styled-components'

export const Input = styled.input`
  display: none;
`

export const Switch = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  border: 2px solid hsl(0, 0%, 90.98039215686275%);
  background-color: hsl(0, 0%, 84.70588235294117%);
  overflow: hidden;
  ${(props) => props.theme.transition('border-color', 'background-color')};

  ${(props) =>
    props.theme.type === 'dark' &&
    css`
      border-color: ${(props) => props.theme.color.text.faded};
      background-color: ${(props) => props.theme.color.background.normal};
    `}
`

export const Background = styled.div`
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

export const Indicator = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%);
  width: 2rem;
  height: 2rem;
  background-color: #fff;
  box-shadow: 0.1rem 0.1rem 0.1rem 0 rgba(0, 0, 0, 0.16);
  border-radius: 100%;
  ${(props) => props.theme.transition('transform')};
`

/**
 * Additional styles to `Container` with active `$checked` attribute
 */
const containerCheckedCSS = css`
  ${Background} {
    transform: scaleX(0.9);
  }

  ${Indicator} {
    transform: translate(calc(50% + 0.4rem), -50%);
  }
`

/**
 * Main wrapper of checkbox
 */
export const Container = styled.label<{ $checked: boolean }>`
  display: block;
  width: 3.8rem;
  height: 2.4rem;
  cursor: pointer;
  ${(props) => props.$checked && containerCheckedCSS}
`
