import React from 'react'

import { film } from '../../../../jest/stubs'
import { itRendersCorrectlyShallow } from '../../../../jest/test-helpers'

import { FilmDetails } from './film-details'

describe('FilmDetails component', () => {
  const props = {
    film: film
  }

  beforeEach(() => {
    props.film = film
  })

  describe('renders correctly', () => {
    itRendersCorrectlyShallow(
      () => <FilmDetails {...props} />,
      'when film is provided'
    )

    itRendersCorrectlyShallow(() => {
      props.film = null
      return <FilmDetails {...props} />
    }, `when film isn't provided`)
  })
})
