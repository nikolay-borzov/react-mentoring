import React from 'react'

import { itRendersCorrectly } from '../../../jest/test-helpers'

import { ImageLoading } from './image-loading'

describe('ImageLoading component', () => {
  itRendersCorrectly(() => <ImageLoading />)
})
