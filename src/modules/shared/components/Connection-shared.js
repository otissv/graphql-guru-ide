import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Error = styled.span`
  color: #f00;
  float: right;
  padding: 7px 20px;
`;
const StatusText = styled.div`
  text-align: right;
  font-size: ${props => props.theme.fonts.size.xsmall};
  width: 100%;
  color: ${props => props.theme.colors.success}
`;

export default class Connection extends PureComponent {
  render () {
    const { isConnected, status, time } = this.props;

    return (
      <StatusText>
        {isConnected
          ? <span>
            {status ? `Status: ${status}` : null}
            {time ? ' Time:' : null} {time ? `${time}ms` : null}
          </span>
          : <Error className="GraphQL-connected">Schema not found</Error>}
      </StatusText>
    );
  }
}
