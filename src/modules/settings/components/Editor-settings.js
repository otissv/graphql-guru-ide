import React from 'react';
import styled from 'styled-components';
import autobind from 'class-autobind';
import cuid from 'cuid';
import Modal from '../../../styled/components/Modal';
import Close from '../../../styled/components/Close';
import Button from '../../../styled/Button-styled';
import Checkbox from '../../../styled/components/Checkbox';

const SubHeading = styled.h2`
  font-size:   16px;
  font-weight: normal;
`;

export default class EditorSettings extends React.PureComponent {
  constructor (props) {
    super(...arguments);
    autobind(this);
  }

  handleOnClickCancel (event) {
    // this.props.setVisibility(false);
  }

  render () {
    return (
      <Modal
        setVisibility={() => {}}
        id={cuid()}
        header="Settings"
        full
        opened={this.props.opened}
      >
        <SubHeading>History</SubHeading>
        <Checkbox display="block">
          Clear query history
        </Checkbox>

        <Checkbox display="block">
          Clear persisted history
        </Checkbox>

        <SubHeading>Queries</SubHeading>
        <Checkbox display="block">
          Clear queries
        </Checkbox>
      </Modal>
    );
  }
}
