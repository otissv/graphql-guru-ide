import styled from 'styled-components';

const FormError = styled.p`
  display: ${props => props.display || 'none'};
  color: #ffffff;
  background: #b52323;
  margin: 0;
  padding: 5px 10px;
  ${props => props.styledFormError};
`;

export default FormError;
