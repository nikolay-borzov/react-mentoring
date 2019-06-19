import { css, CSSObject, SimpleInterpolation } from 'styled-components'

const sizes = {
  small: 768,
  medium: 992,
  large: 1200
}

type CSS = TemplateStringsArray | CSSObject

export const media = {
  small: (first: CSS, ...interpolations: SimpleInterpolation[]) => css`
    @media (min-width: ${sizes.small}px) and (max-width: ${sizes.medium -
        1}px) {
      ${css(first, ...interpolations)};
    }
  `,

  medium: (first: CSS, ...interpolations: SimpleInterpolation[]) => css`
    @media (min-width: ${sizes.medium}px) and (max-width: ${sizes.large -
        1}px) {
      ${css(first, ...interpolations)};
    }
  `,

  large: (first: CSS, ...interpolations: SimpleInterpolation[]) => css`
    @media (min-width: ${sizes.large}px) {
      ${css(first, ...interpolations)};
    }
  `,

  bigger: (first: CSS, ...interpolations: SimpleInterpolation[]) => css`
    @media (min-width: ${sizes.small}px) {
      ${css(first, ...interpolations)};
    }
  `
}
