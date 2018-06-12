import React from 'react'
import { storiesOf } from '@storybook/react'

import { Header } from '../src/components'

storiesOf('Header', module).addWithJSX('Default', () => (
  <Header>Content</Header>
))
