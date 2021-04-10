import styled from 'styled-components'

interface LabelProps {
  htmlFor: string
  children: string
  labelColor?: string
}

const StyledLabel = styled.label<LabelProps>`
  margin-bottom: 5px;
  display: block;
  color: ${(props) => props.labelColor};
`

export default StyledLabel;
