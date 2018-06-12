import React from 'react'
import { storiesOf } from '@storybook/react'

import { SiteName } from '../src/components'

storiesOf('SiteName', module).addWithJSX('Default', () => <SiteName />)
