import styled, { keyframes } from 'styled-components'

export const Container = styled.ul`
  margin: 0;
  padding: 1.2rem 1.6rem;
  height: 100%;
  list-style: none;
`

const placeolderShimmer = keyframes`
  0% {
    background-position: -46.8rem 0;
  }

  100% {
    background-position: 46.8rem 0;
  }
`

export const Segment = styled.li<{ width: string }>`
  --background: ${(props) =>
    props.theme.type === 'dark'
      ? props.theme.color.border.normal
      : 'hsl(0, 0%, 92.5%)'};

  width: ${(props) => props.width};
  height: 1.6rem;
  border-radius: 1rem;
  margin: 1.2rem 0;
  animation: ${placeolderShimmer} 1.25s linear forwards infinite;
  background: var(--background);
  background-repeat: no-repeat;
  background-image: -webkit-linear-gradient(
    left,
    var(--background) 0%,
    ${(props) => props.theme.color.custom.content.background} 20%,
    var(--background) 40%,
    var(--background) 100%
  );

  ${(props) => props.theme.transition('background-color')};
`
