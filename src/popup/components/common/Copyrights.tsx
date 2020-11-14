import React from 'react'
import styled from 'styled-components'

const Component = styled.p`
  margin: 0 0 16px;
  text-align: center;
  font-size: 10px;
  color: ${(props) => props.theme.color.text.faded};
  ${(props) => props.theme.transition('color')};

  a {
    color: inherit;
    text-decoration: underline;
  }
`

export const Copyrights = () => (
  <Component>
    Coded by{' '}
    <a href="https://github.com/tyczynski" target="_blank" rel="noreferrer">
      PT
    </a>
    . Designed by{' '}
    <a href="https://kyosk.studio" target="_blank" rel="noreferrer">
      kyosk.studio
    </a>
  </Component>
)
