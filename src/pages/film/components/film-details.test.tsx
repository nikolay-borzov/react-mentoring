import React from 'react'

import { film } from '../../../../jest/stubs'
import { itRendersCorrectlyShallow } from '../../../../jest/test-helpers'
import { FilmDetails, FilmDetailsProps } from './film-details'

describe('FilmDetails component', () => {
  const props: FilmDetailsProps = {
    film
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
      props.film = undefined
      return <FilmDetails {...props} />
    }, `when film isn't provided`)
  })
})
