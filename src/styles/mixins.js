// @flow

import { css } from 'styled-components'

export const HoverEffectMixin = css`
  transition: background-color var(--transition-duration),
    box-shadow var(--transition-duration);

  &:hover {
    box-shadow: 0 0 20px var(--color-primary), 2px 2px 2px rgba(0, 0, 0, 0.5);
  }
`
