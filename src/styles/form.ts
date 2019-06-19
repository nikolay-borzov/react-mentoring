import styled from 'styled-components'

export const FormRow = styled.div`
  display: flex;
  align-items: center;

  & + & {
    padding-top: var(--margin-input);
  }
`

export const FormLabel = styled.label`
  margin-right: var(--margin-input);
`
