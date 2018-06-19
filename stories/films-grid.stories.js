import React from 'react'
import { storiesOf } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'

import { FilmsGrid } from '../src/components'

import { getRandomFilm } from '../jest/stubs'

const films = Array.from({ length: 7 }, (v, i) => getRandomFilm(i + 1))

storiesOf('FilmsGrid', module)
  .addDecorator(story => <MemoryRouter>{story()}</MemoryRouter>)
  .addWithJSX('Films grid', () => <FilmsGrid films={films} />)
