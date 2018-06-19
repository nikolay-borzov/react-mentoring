import React from 'react'
import { storiesOf } from '@storybook/react'

import { ContentMessage } from '../src/components'

import { Centered } from '../.storybook/decorators'

storiesOf('ContentMessage', module)
  .addDecorator(Centered)
  .addWithJSX('Default', () => <ContentMessage>Message</ContentMessage>)
  .addWithJSX('With custom CSS class', () => (
    <ContentMessage className="font-size-header">Message</ContentMessage>
  ))
