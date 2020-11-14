import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  padding: 2.4rem 3.6rem;
  text-align: center;
`

export const Title = styled.h3`
  font-size: 1.6rem;
  line-height: 1.8rem;
  font-weight: 600;
  margin: 0 0 0.4rem;
`

export const Text = styled.span`
  font-size: 1.2rem;
  line-height: 1.4rem;
  color: ${(props) => props.theme.color.text.faded};
`

export const Icon = styled.svg`
  margin: 0 0 2.4rem;
`
