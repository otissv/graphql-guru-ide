import React from 'react';
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
  background: rgba(0,0,0, 0.6);
`;

const Dialog = styled.div`
  background: ${props => props.theme.colors.background};
  max-width: ${props => (props.full ? 'auto' : '600px')};
  margin: ${props => (props.full ? '10px' : '50px auto')};
  border: ${props => props.theme.borders.thin};
  transition: opacity .3s linear,transform 3s ease-out;
  opacity: 0.3;
  transform: translateY(-300px);
  overflow:   auto;
  height: ${props => (props.full ? '98vh' : 'auto')};

  &.opened {
    opacity: 1;
    transform: translateY(0);
  }  
`;

const DialogHeader = styled.div`
  padding: 6px 15px;
  border-bottom: ${props => props.theme.borders.thickPrimary}
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
  text-align: right
`;

export default class InputModal extends React.PureComponent {
  constructor (props) {
    super(...arguments);
    autobind(this);
  }

  handleOnClickCancel (event) {
    this.props.setVisibility(false);
  }

  render () {
    const { children, header, submit, id, cancel, opened, full } = this.props;
    return (
      <Modal opened={opened} id={`modal-${id}`}>
        <Dialog
          className={opened ? 'opened' : null}
          id={`dialog-${id}`}
          full={full}
        >
          <DialogHeader>
            <DialogTitle>{header}</DialogTitle>
            <Close onClick={this.handleOnClickCancel} hover={true} />
          </DialogHeader>
          <DialogBody>
            {children}
          </DialogBody>
          <DialogFooter full={full}>
            {cancel
              ? <Button onClick={this.handleOnClickCancel}>
                  {cancel.body}
                </Button>
              : <Button onClick={this.handleOnClickCancel}>
                  Close
                </Button>}
            {submit
              ? <Button primary onClick={submit.onClick}>
                  {submit.body}
                </Button>
              : null}
          </DialogFooter>
        </Dialog>
      </Modal>
    );
  }
}
