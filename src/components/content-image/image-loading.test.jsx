import React from 'react'

import { itRendersCorrectlyShallow } from '../../../jest/test-helpers'

import { ImageLoading } from './image-loading'

describe('ImageLoading component', () => {
  itRendersCorrectlyShallow(() => <ImageLoading />)
})
