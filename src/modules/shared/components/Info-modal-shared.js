import React, { PureComponent } from 'react';
import Modal from '../../../styled/components/Modal';
import cuid from 'cuid';
import styled from 'styled-components';

const Label = styled.label`
  display: inline-block;
  font-weight: 700;
  font-size: 12px;
  color: ${props => props.theme.colors.foreground};
  line-height: 1.6;
  width: 100px;
`;

const SubHeading = styled.h6`
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 2px;
`;

export default class InfoModal extends PureComponent {
  render () {
    const { selectedItem, setInfoModal, opened, result, infoModalHeader } = this.props;

    const { headers, request, status, time } = result || {};

    const responseHeaderKeys = headers ? Object.keys(headers) : [];
    const responseHeaderItems =
      responseHeaderKeys.length > 0 &&
      responseHeaderKeys.map(key => {
        return (
          <div key={key}>
            <Label>{key}: </Label> {headers[key]}
          </div>
        );
      });

    const requestHeaderKeys =
      request && request.headers ? Object.keys(request.headers) : [];

    const requestHeaderItems =
      requestHeaderKeys > 0 &&
      requestHeaderKeys.map(key => {
        return (
          <div key={key}>
            <Label>{key}: </Label> {request.headers[key]}
          </div>
        );
      });
    
      
    return (
      <Modal
        setVisibility={setInfoModal}
        id={cuid()}
        header={infoModalHeader}
        opened={opened}
        cancel={{ body: 'Close' }}
      >
        <SubHeading>
          {selectedItem.name}
        </SubHeading>

        <div>
          <Label>id: </Label> {selectedItem.id}
        </div>
        <SubHeading>General</SubHeading>
        <div>
          <Label>Request URL: </Label> {request && request.url}
        </div>
        <div>
          <Label>Request Method: </Label> Post
        </div>
        <div>
          <Label>Status Code:</Label> {status}
        </div>
        <div>
          <Label>Duration: </Label> {time} ms
        </div>

        <SubHeading>Request Headers</SubHeading>
        {requestHeaderItems}

        <SubHeading>Response Headers</SubHeading>
        {responseHeaderItems}
      </Modal>
    );
  }
}
