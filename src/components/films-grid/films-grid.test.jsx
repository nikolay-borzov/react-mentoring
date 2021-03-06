import React from 'react'

import {
  itRendersCorrectlyShallow,
  itContainsComponent
} from '../../../jest/test-helpers'
import { film, films } from '../../../jest/stubs'

import { FilmsGrid } from './films-grid'

describe('FilmsGrid component', () => {
  let props = {
    films: films
  }

  itRendersCorrectlyShallow(() => {
    return <FilmsGrid {...props} />
  })

  itContainsComponent(() => <FilmsGrid {...props} />, 'FilmsGridItem', {
    expectedProps: {
      film: film
    }
  })
})
