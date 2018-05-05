import React from 'react'

import {
  itRendersCorrectly,
  itContainsComponent
} from '../../../jest/test-helpers'

import { FilmsGridItem } from './films-grid-item'

describe('FilmsGridItem component', () => {
  let props = {
    film: {
      id: 1,
      title: 'Film title',
      poster_path: '//content/posters/1.png',
      overview: 'Film overview',
      release_date: '2018-05-04',
      genres: ['some genre', 'another genre']
    }
  }

  itRendersCorrectly(() => <FilmsGridItem {...props} />)

  itContainsComponent(() => <FilmsGridItem {...props} />, 'ContentImage', {
    expectedProps: {
      src: props.film.poster_path,
      alt: props.film.title,
      title: props.film.overview
    }
  })
})
