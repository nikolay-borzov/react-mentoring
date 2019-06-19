import React from 'react'
import styled, { keyframes } from 'styled-components'

const LoadingIndicatorStyled = styled.div`
  font-size: 250%;
`

/* Animation from https://github.com/tobiasahlin/SpinKit */
const LoadingSpinner = styled.div`
  text-align: center;
`

const bounce = keyframes`
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`

const LoadingSpinnerBounce = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background-color: var(--color-default);

  border-radius: 100%;
  display: inline-block;
  animation: ${bounce} 1.4s infinite ease-in-out both;
  transform-origin: center center;

  .alt-background & {
    background-color: var(--color-text-light);
  }
`

const LoadingSpinnerBounceDelayedMore = styled(LoadingSpinnerBounce)`
  animation-delay: -0.32s;
`

const LoadingSpinnerBounceDelayed = styled(LoadingSpinnerBounce)`
  animation-delay: -0.16s;
`

interface LoadingIndicatorProps {
  hideText?: boolean
}

export const LoadingIndicator: React.FunctionComponent<
  LoadingIndicatorProps
> = ({ hideText }) => (
  <LoadingIndicatorStyled className="centered font-bold">
    <div>
      <LoadingSpinner>
        <LoadingSpinnerBounceDelayedMore />
        <LoadingSpinnerBounceDelayed />
        <LoadingSpinnerBounce />
      </LoadingSpinner>
      {hideText ? null : <>Loading&hellip;</>}
    </div>
  </LoadingIndicatorStyled>
)
