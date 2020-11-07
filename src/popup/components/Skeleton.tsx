import React from 'react'
import styled from 'styled-components'

const Segment = styled.li<{ width: string }>`
  display: block;
  position: relative;
  overflow: hidden;
  width: ${(props) => props.width};
  height: 16px;
  border-radius: 10px;
  margin: 12px 0 12px 8px;
  --background: ${(props) =>
    props.theme.type === 'dark'
      ? props.theme.color.border.normal
      : 'hsl(0, 0%, 92.5%)'};

  animation: placeHolderShimmer 1.25s linear forwards infinite;
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

  @keyframes placeHolderShimmer {
    0% {
      background-position: -468px 0;
    }

    100% {
      background-position: 468px 0;
    }
  }
`

const Skeleton = () => (
  <>
    <Segment width="80%" />
    <Segment width="40%" />
    <Segment width="67%" />
    <Segment width="32%" />
    <Segment width="58%" />
    <Segment width="75%" />
    <Segment width="90%" />
    <Segment width="49%" />
  </>
)

export default Skeleton
