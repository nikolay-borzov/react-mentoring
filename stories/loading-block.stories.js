import React from 'react'
import { storiesOf } from '@storybook/react'

import { LoadingBlock } from '../src/components'

import { Centered, AltBackground } from '../.storybook/decorators'

storiesOf('LoadingBlock', module)
  .addDecorator(Centered)
  .addWithJSX('With text', () => (
    <LoadingBlock isLoaded={false}>Content</LoadingBlock>
  ))
  .addWithJSX('Without text', () => (
    <LoadingBlock isLoaded={false} hideText={true}>
      Content
    </LoadingBlock>
  ))

storiesOf('LoadingBlock', module)
  .addDecorator(Centered)
  .addDecorator(AltBackground)
  .addWithJSX('With text (alt background)', () => (
    <LoadingBlock isLoaded={false}>Content</LoadingBlock>
  ))
  .addWithJSX('Without text (alt background)', () => (
    <LoadingBlock isLoaded={false} hideText={true}>
      Content
    </LoadingBlock>
  ))
