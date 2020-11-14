import styled, { css } from 'styled-components'
import IconButton from '@popup/components/IconButton'

export const Icon = styled.svg`
  fill: ${(props) => (props.theme.type === 'light' ? '#d8d8d8' : '#626066')};
  ${(props) => props.theme.transition('fill')};
`

export const Column = styled.div`
  display: flex;
  align-items: center;
`

export const Badge = styled.div`
  font-size: 1rem;
  padding: 0.2rem 0.4rem;
  border-radius: 0.2rem;
  background-color: ${(props) => props.theme.color.custom.badge.background};
  color: ${(props) => props.theme.color.text.faded};
  ${(props) => props.theme.transition('color', 'background-color')};
`

const hiddenCSS = css`
  transform: translate(1.5rem);
  opacity: 0;
  pointer-events: none;
`

export const EditButton = styled(IconButton)<{ $hidden: boolean }>`
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 1.6rem;

  ${(props) => props.theme.transition('transform', 'opacity')};
  ${({ $hidden }) => $hidden && hiddenCSS}
`

const activeCSS = css`
  h2 {
    color: ${(props) => props.theme.color.text.normal};
  }

  ${EditButton} {
    ${Icon} {
      fill: ${(props) =>
        props.theme.type === 'light' ? props.theme.color.text.faded : '#fff'};
    }
  }
`

const fadedCSS = css`
  opacity: 0.3;
  pointer-events: none;
`

export const Container = styled.li<{ $faded: boolean; $active: boolean }>`
  --buttons-width: 5.2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1.6rem;
  overflow: hidden;
  ${(props) => props.theme.transition('opacity', 'color')};

  ${Column} {
    &:first-child {
      width: calc(100% - var(--buttons-width));
      padding-right: 1.6rem;
    }

    &:last-child {
      width: var(--buttons-width);
    }
  }

  &:hover {
    ${activeCSS}
  }

  ${({ $faded }) => $faded && fadedCSS}
  ${({ $active }) => $active && activeCSS}
`
