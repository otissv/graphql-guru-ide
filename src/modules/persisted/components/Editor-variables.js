import React, { PureComponent } from 'react';
import autobind from 'class-autobind';
import styled from 'styled-components';
import CodeMirror from 'react-codemirror';
import '../../../../node_modules/codemirror/lib/codemirror.css';
require('codemirror/mode/javascript/javascript');
require('codemirror/addon/fold/foldgutter');
require('codemirror/addon/fold/brace-fold');
require('codemirror/addon/dialog/dialog');
require('codemirror/addon/search/search');
require('codemirror/keymap/sublime');

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 29px;
  position: relative;
`;

const VariablesHeader = styled.div`
  background: ${props => props.theme.colors.background}
  color: ${props => props.theme.fonts.color};
  line-height: 18px;
  padding: 6px 0 8px 15px;

  &:hover {
    background: ${props => props.theme.button.hover.background}
  }
`;

const CodeMirrorContainer = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export default class Variables extends PureComponent {
  constructor () {
    super(...arguments);
    autobind(this);
    this.state = {
      height: '30px',
      cursor: 'n-resize'
    };
  }

  handleHeadingClick () {
    if (this.state.height !== '30px') {
      this.setState({ height: '30px', cursor: 'n-resize' });
    } else {
      this.setState({ height: '165px', cursor: 'row-resize' });
    }
  }

  handleOnchange () {
    const value = this.editor.getCodeMirror().doc.getValue();
    this.props.handleOnChange(value);
  }

  render () {
    const { value } = this.props;

    return (
      <Container style={{ 
        height: this.state.height,
        cursor: this.state.cursor
      }}>
        <VariablesHeader onClick={this.handleHeadingClick}>
          Persisted Variables
        </VariablesHeader>
        <CodeMirrorContainer>
          <CodeMirror
          ref={editor => {
            this.editor = editor;
          }}
          autoFocus={true}
          autoSave={true}
          onChange={this.handleOnchange}
          preserveScrollPosition={true}
          value={value}
          options={{
            autoCloseBrackets: true,
            extraKeys: {
              'Ctrl-Left': 'goSubwordLeft',
              'Ctrl-Right': 'goSubwordRight',
              'Alt-Left': 'goGroupLeft',
              'Alt-Right': 'goGroupRight'
            },
            foldGutter: {
              minFoldSize: 4
            },
            gutters: ['CodeMirror-foldgutter'],
            keyMap: 'sublime',
            lineNumbers: true,
            matchBrackets: true,
            mode: 'application/json',
            json: true,
            showCursorWhenSelecting: true,
            tabSize: 2,
            theme: 'dracula'
          }}
        />
        </CodeMirrorContainer>
      </Container>
    );
  }
}
