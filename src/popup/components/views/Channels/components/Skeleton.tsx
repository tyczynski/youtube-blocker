import React from 'react'
import { Container, Segment } from './Skeleton.styles'

/**
 * Skeleton loading as a preloader to fetched channels from browser's storage
 */
export const Skeleton = () => (
  <Container>
    <Segment width="80%" />
    <Segment width="40%" />
    <Segment width="67%" />
    <Segment width="32%" />
    <Segment width="58%" />
    <Segment width="75%" />
    <Segment width="90%" />
    <Segment width="49%" />
  </Container>
)
