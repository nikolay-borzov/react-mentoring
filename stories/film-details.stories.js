import React from 'react'
import { storiesOf } from '@storybook/react'

import { FilmDetails } from '../src/pages/film/components/film-details'

import { film } from '../jest/stubs'

storiesOf('FilmDetails', module).addWithJSX('Film details', () => (
  <FilmDetails film={film} />
))
