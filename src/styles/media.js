// @ flow

import { css } from 'styled-components'

const sizes = {
  small: 768,
  medium: 992,
  large: 1200
}

export const media = {
  small: (...args) => css`
    @media (min-width: ${sizes.small}px) and (max-width: ${sizes.medium -
        1}px) {
      ${css(...args)};
    }
  `,

  medium: (...args) => css`
    @media (min-width: ${sizes.medium}px) and (max-width: ${sizes.large -
        1}px) {
      ${css(...args)};
    }
  `,

  large: (...args) => css`
    @media (min-width: ${sizes.large}px) {
      ${css(...args)};
    }
  `,

  bigger: (...args) => css`
    @media (min-width: ${sizes.small}px) {
      ${css(...args)};
    }
  `
}
