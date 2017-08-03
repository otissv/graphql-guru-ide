import React, { PureComponent } from 'react';
import autobind from 'class-autobind';
import Modal from '../../../styled/components/Modal';
import cuid from 'cuid';
import styled from 'styled-components';
import IconButton from '../../../styled/components/IconButton';
import copy from '../../../icons/copy.svg';
import CopyToClipboard from 'react-copy-to-clipboard';

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

const Copy = styled.div`
  display: inline;
`;

const Copied = styled.div`
  display: inline;
  transition: opacity ease-in 0.2s;
  font-size: ${props => props.theme.fonts.size.xsmall};
  margin-left: 5px;
`;

export default class InfoModal extends PureComponent {
  constructor (props) {
    super(...arguments);
    autobind(this);
    
    this.state = {
      copied: false
    };
  }

  onCopy () {
    if (this.props.selectedItem.id) {
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2000);
    }
  }
  render () {
    const { selectedItem, setInfoModal, opened, result, infoModalHeader } = this.props;
    const { headers, request, status, time } = result || {};

    const responseHeaderKeys = headers 
      ? Object.keys(headers) 
      : [];

    const responseHeaderItems = 
      responseHeaderKeys.length > 0 && responseHeaderKeys.map(key => {
        return (
          <div key={key}>
            <Label>{key}: </Label> {headers[key]}
          </div>
        );
      });

    const requestHeaderKeys = request && request.headers 
      ? Object.keys(request.headers) 
      : [];

    const requestHeaderItems = 
      requestHeaderKeys > 0 && requestHeaderKeys.map(key => {
        return (
          <div key={key}>
            <Label>{key}: </Label> {request.headers[key]}
          </div>
        );
      });

    const icon = selectedItem.id 
      ? <IconButton
          src={copy}
        />
      : null;
    
      
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


          <CopyToClipboard
            text={selectedItem.id}
            onCopy={this.onCopy}
          >
            <Copy>
              <Label>id: </Label> 
                {selectedItem.id} {icon} 
                <Copied style={{ opacity: this.state.copied ? 1 : 0 }}>copied</Copied>
            </Copy>
          </CopyToClipboard>

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
