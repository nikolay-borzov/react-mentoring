import React from 'react'

import {
  itRendersCorrectly,
  itContainsComponent
} from '../../../jest/test-helpers'

import { ContentImage } from './content-image'

describe('ContentImage component', () => {
  let props

  beforeEach(() => {
    props = {
      src: 'http://images/test.png',
      alt: 'Image alt text',
      title: undefined
    }
  })

  itRendersCorrectly(() => <ContentImage {...props} />)

  itRendersCorrectly(() => {
    props.title = 'Image title'
    return <ContentImage {...props} />
  }, 'renders correctly with title specified')

  itContainsComponent(() => <ContentImage {...props} />, 'ImageLoading')
})
