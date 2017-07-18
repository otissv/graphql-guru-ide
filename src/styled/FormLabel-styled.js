import styled from 'styled-components';

const FormLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-weight: 400;
  ${props => props.styledFormLabel};
`;

export default FormLabel;
