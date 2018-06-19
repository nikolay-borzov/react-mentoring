// @flow

import React from 'react'
import styled from 'styled-components'

import ImageLoader from 'react-load-image'
import { ImageLoading } from './image-loading'

type ContentImageProps = {
  src: string,
  alt: string,
  title: string
}

const ImageLoaderStyled = styled(ImageLoader)`
  /* Take all available width (needed for keeping aspect ratio)*/
  width: 100%;
`

const ContentImageStyled = styled.img`
  max-width: 100%;
  display: block;
`

export const ContentImagePlaceholder = styled.div`
  position: relative;
  max-width: 100%;
  display: block;
  width: 100%;
  /* Keep aspect ratio */
  padding-top: 150%;
  background-color: rgba(0, 0, 0, 0.1);

  & > * {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

ContentImage.defaultProps = {
  title: ''
}

export function ContentImage({ src, title, alt }: ContentImageProps) {
  return (
    <ImageLoaderStyled src={src}>
      <ContentImageStyled title={title} alt={alt} />
      <ContentImagePlaceholder className="color-alt">
        <span>Image unavailable</span>
      </ContentImagePlaceholder>
      <ContentImagePlaceholder>
        <ImageLoading />
      </ContentImagePlaceholder>
    </ImageLoaderStyled>
  )
}
