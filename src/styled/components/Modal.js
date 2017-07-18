import React, { PureComponent } from 'react';
import autobind from 'class-autobind';
import styled from 'styled-components';
import Button from '../Button-styled';
import Close from './Close';

const Modal = styled.div`
  display: ${props => (props.opened ? 'block' : 'none')};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.8);
`;

const Dialog = styled.div`
  background: ${props => props.theme.colors.background};
  max-width: ${props => (props.full ? 'auto' : '600px')};
  margin: ${props => (props.full ? '10px' : '50px auto')};
  border: ${props => props.theme.borders.thin};
  transition: opacity .3s linear, transform 3s ease-out;
  opacity: 0.3;
  transform: translateY(-300px);
  overflow: auto;
  height: ${props => (props.full ? '98vh' : 'auto')};

  &.opened {
    opacity: 1;
    transform: translateY(0);
  }
`;

const DialogHeader = styled.div`
  padding: 6px 15px;
  border-bottom: ${props => props.theme.borders.thinPrimary};
`;

const DialogTitle = styled.h5`
  font-weight: normal;
  font-size: 16px;
  margin: 0;
  display: inline;
`;

const DialogBody = styled.div`
  padding: 15px;
  overflow: auto;
`;

const DialogFooter = styled.div`
  padding: 15px;
  position: ${props => (props.full ? 'absolute' : 'relative')};
  bottom: 0;
  right: 0;
  text-align: right;
`;

const DialogCancel = props => {
  const { body, onClose } = props;
  return body
    ? <Button onClick={onClose}>
        {body}
      </Button>
    : null;
};

const DialogSubmit = props => {
  const { body, onSubmit, type } = props;
  return body
    ? <Button type={type} primary onSubmit={onSubmit}>
        {body}
      </Button>
    : null;
};

export default class InputModal extends PureComponent {
  constructor (props) {
    super(...arguments);
    autobind(this);
  }

  handleOnClickCancel (event) {
    this.props.setVisibility(false);
  }

  render () {
    const { cancel, children, full, header, id, opened, submit } = this.props;

    return (
      <Modal opened={opened} id={`modal-${id}`}>
        <Dialog
          className={opened ? 'opened' : null}
          id={`dialog-${id}`}
          full={full}
        >
          <DialogHeader>
            <DialogTitle>
              {header}
            </DialogTitle>
            <Close onClick={this.handleOnClickCancel} hover={true} />
          </DialogHeader>

          <DialogBody>
            {children}
          </DialogBody>

          {submit || cancel
            ? <DialogFooter full={full}>
                <DialogCancel {...cancel} onClose={this.handleOnClickCancel} />
                <DialogSubmit {...submit} />
              </DialogFooter>
            : null}
        </Dialog>
      </Modal>
    );
  }
}
