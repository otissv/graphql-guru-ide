import React from 'react';
// import FormInput from 'react-uikit-form/lib/form-input';
import autobind from 'class-autobind';
import styled from 'styled-components';
import Input from '../../../styled/components/Input';
import Icon from '../../../styled/components/Icon';

const FooterBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.foreground};
  margin-left: 5px;
  outline: none;
  padding: 0 2px;
  text-align: center;
`;

const Label = styled.label`
`;

const Error = styled.span`
  color: #f00;
  float: right;
  padding: 7px 20px;
`;

export default class Footer extends React.Component {
  constructor () {
    super(...arguments);
    autobind(this);
  }

  componentDidMount () {
    this.fetchSchema(this.props.endpoint);
  }

  handleChangeEndpoint (event) {
    const endpointValue = event.nativeEvent.target.value;
    if (
      endpointValue &&
      this.props.endpoint !== endpointValue &&
      endpointValue.trim() !== ''
    ) {
      this.fetchSchema(endpointValue);
    }
  }

  fetchSchema (endpointValue) {
    const {
      setGraphqlSchema,
      getGraphqlSchema,
      setSchemaIsConnected
    } = this.props;

    this.props.setEndpoint(endpointValue);
    getGraphqlSchema(endpointValue).payload
      .then(response => {
        if (response.data && response.data.__schema) {
          setGraphqlSchema(response.data);
          setSchemaIsConnected(true);
        }
      })
      .catch(error => {
        console.log(error);
        setGraphqlSchema({});
        setSchemaIsConnected(false);
      });
  }

  render () {
    const status = this.props.isConnected
      ? null
      : <Error className="GraphQL-connected">
          Schema not found
        </Error>;

    return (
      <FooterBar>
        <Label>GraphQL Endpoint:</Label>
        <Input
          size="small"
          width="300px"
          onChange={this.handleChangeEndpoint}
          value={this.props.endpoint}
        />
        {status}
      </FooterBar>
    );
  }
}
