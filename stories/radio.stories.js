import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Radio } from '../src/components'

import { Centered } from '../.storybook/decorators'

const radioOptions = [
  {
    name: 'Title',
    value: 'title'
  },
  {
    name: 'Genre',
    value: 'genre'
  }
]

storiesOf('Radio', module)
  .addDecorator(Centered)
  .addWithJSX('Button', () => (
    <Radio
      name="searchBy"
      label="Search by"
      defaultValue="title"
      options={radioOptions}
      style="button"
    />
  ))
  .addWithJSX('Plain', () => (
    <Radio
      name="searchBy"
      label="Search by"
      defaultValue="genre"
      options={radioOptions}
    />
  ))
  .addWithJSX('Controlled component', () => (
    <Radio
      name="searchBy"
      label="Search by"
      value="title"
      onChange={action('option-change')}
      options={radioOptions}
    />
  ))
