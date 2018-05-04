import React from 'react'

import {
  itRendersCorrectly,
  itContainsComponent
} from '../../../jest/test-helpers'

import { FilmsGrid } from './films-grid'

describe('FilmsGrid component', () => {
  const film = {
    id: 1,
    title: 'Film title',
    poster_path: '//content/posters/1.png',
    overview: 'Film overview',
    release_date: '2018-05-04',
    genres: ['some genre', 'another genre']
  }

  let props = {
    films: [film]
  }

  itRendersCorrectly(() => {
    return <FilmsGrid {...props} />
  })

  itContainsComponent(() => <FilmsGrid {...props} />, 'FilmsGridItem', 1, {
    film: film
  })
})
