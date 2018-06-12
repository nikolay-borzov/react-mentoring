import React from 'react'
import { storiesOf } from '@storybook/react'

import { ContentImage } from '../src/components'
import { ImageLoading } from '../src/components/content-image/image-loading'

import { Centered } from '../.storybook/decorators'

storiesOf('ContentImage', module)
  .addDecorator(story => (
    <div style={{ width: '300px', margin: 'auto' }}>{story()}</div>
  ))
  .addDecorator(Centered)
  .addWithJSX('Available', () => (
    <ContentImage
      src={'https://placebear.com/300/450.jpg'}
      alt="Bears"
      title="Bears"
    />
  ))
  .addWithJSX('Unavailable', () => (
    <ContentImage src={'https://foo.jpg'} alt="What?" />
  ))
  .add('Loading', () => (
    <div className="content-image-placeholder">
      <ImageLoading />
    </div>
  ))
