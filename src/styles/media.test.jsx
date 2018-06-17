import React from 'react'
import styled from 'styled-components'
import 'jest-styled-components'

import { itRendersCorrectlyShallow } from '../../jest/test-helpers'

import { media } from './media'

describe('media', () => {
  itRendersCorrectlyShallow(() => {
    const Component = styled.div`
      ${media.small`z-index: 2`};
    `

    return <Component />
  }, `sets styles for 'small' media`)

  itRendersCorrectlyShallow(() => {
    const Component = styled.div`
      ${media.medium`z-index: 2`};
    `

    return <Component />
  }, `sets styles for 'medium' media`)

  itRendersCorrectlyShallow(() => {
    const Component = styled.div`
      ${media.large`z-index: 2`};
    `

    return <Component />
  }, `sets styles for 'large' media`)

  itRendersCorrectlyShallow(() => {
    const Component = styled.div`
      ${media.bigger`z-index: 2`};
    `

    return <Component />
  }, `sets styles for 'bigger' media`)
})
