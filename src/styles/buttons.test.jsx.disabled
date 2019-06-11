import React from 'react'
import 'jest-styled-components'

import { itRendersCorrectlyShallow } from '../../jest/test-helpers'

import { Button, NavigateButton } from './buttons'

describe('ButtonStyled', () => {
  itRendersCorrectlyShallow(() => {
    return <Button />
  }, 'default')

  itRendersCorrectlyShallow(() => {
    return <Button primary />
  }, 'primary')

  itRendersCorrectlyShallow(() => {
    return <Button small />
  }, 'small')
})

describe('NavigateButtonStyled', () => {
  itRendersCorrectlyShallow(() => {
    return <NavigateButton />
  }, 'default')

  itRendersCorrectlyShallow(() => {
    return <NavigateButton primary />
  }, 'primary')

  itRendersCorrectlyShallow(() => {
    return <NavigateButton small />
  }, 'small')
})
