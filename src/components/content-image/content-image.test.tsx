import React from 'react'

import {
  itRendersCorrectlyShallow,
  itContainsComponent
} from '../../../jest/test-helpers'

import { ContentImage, ContentImageProps } from './content-image'

describe('ContentImage component', () => {
  let props: ContentImageProps

  beforeEach(() => {
    props = {
      src: 'http://images/test.png',
      alt: 'Image alt text',
      title: undefined
    }
  })

  itRendersCorrectlyShallow(() => <ContentImage {...props} />)

  itRendersCorrectlyShallow(() => {
    props.title = 'Image title'
    return <ContentImage {...props} />
  }, 'renders correctly with title specified')

  itContainsComponent(() => <ContentImage {...props} />, 'ImageLoading')
})
