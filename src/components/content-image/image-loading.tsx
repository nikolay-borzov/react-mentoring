import React from 'react'
import styled, { keyframes } from 'styled-components'

/* Animation from https://github.com/tobiasahlin/SpinKit */
const ImageSpinner = styled.div`
  width: 5rem;
  height: 5rem;
`

const bounce = keyframes`
 0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
`

const ImageSpinnerBounce1 = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: var(--color-default);
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;

  animation: ${bounce} 2s infinite ease-in-out;
`
const ImageSpinnerBounce2 = styled(ImageSpinnerBounce1)`
  animation-delay: -1s;
`

export const ImageLoading: React.FunctionComponent = () => (
  <ImageSpinner>
    <ImageSpinnerBounce1 />
    <ImageSpinnerBounce2 />
  </ImageSpinner>
)
