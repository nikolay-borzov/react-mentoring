import React from 'react'

import {
  itRendersCorrectly,
  itContainsComponent
} from '../../../jest/test-helpers'
import { film } from '../../../jest/stubs'

import { FilmsGridItem } from './films-grid-item'

describe('FilmsGridItem component', () => {
  let props = {
    film
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
