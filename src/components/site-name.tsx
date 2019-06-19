import React from 'react'
import styled from 'styled-components'

const SiteNameStyled = styled.span`
  color: var(--color-primary);
  font-weight: 700;
`

export const SiteName: React.FunctionComponent = () => <SiteNameStyled>Movie Search</SiteNameStyled>
