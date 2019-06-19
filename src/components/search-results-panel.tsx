import * as React from 'react'
import styled from 'styled-components'

import { media } from '../styles/media'

// TODO: Create a common interface
interface SearchResultsPanelProps {
  children: React.ReactNode
}

const SearchResultsPanelStyled = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: var(--color-text-light);

  /* flex-columns */
  flex-direction: column;

  & > * + * {
    margin-top: 1rem;
  }

  ${media.bigger`
    /* flex-rows (cancels flex-columns ) */
    flex-direction: row;

    & > * + * {
      margin-top: 0;
    }
  `};
`

export const SearchResultsPanel: React.FunctionComponent<
  SearchResultsPanelProps
> = props => (
  <SearchResultsPanelStyled
    className="font-bold padding-controls"
    data-cy="search-results-panel">
    {props.children}
  </SearchResultsPanelStyled>
)
