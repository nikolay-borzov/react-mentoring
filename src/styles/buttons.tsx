import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { HoverEffectMixin } from './mixins'

interface ButtonProps {
  primary?: boolean
  small?: boolean
}

export const Button = styled.input<ButtonProps>`
  display: flex;
  padding: var(--padding-button);
  text-transform: uppercase;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 700;
  transition: background-color var(--transition-duration),
              box-shadow var(--transition-duration);
  box-sizing: border-box;
  border: none;
  color: var(--color-text-light);
  user-select: none;

  ${HoverEffectMixin}

  ${props =>
    props.small
      ? `padding: var(--padding-button-small);
         font-size: 1rem;`
      : ''}

  ${props => (props.primary ? `background-color: var(--color-primary);` : '')}
`

export const NavigateButton = styled(props => <Button as={Link} {...props} />)`
  ${props =>
    props.primary ? `color: var(--color-text-light) !important;` : ''}
`
