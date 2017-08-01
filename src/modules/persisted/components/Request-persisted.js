import React from 'react';
import CodeMirror from 'react-codemirror';
import autobind from 'class-autobind';
import styled from 'styled-components';
import '../../../../node_modules/codemirror/lib/codemirror.css';
require('codemirror/mode/javascript/javascript');
require('codemirror/addon/fold/foldgutter');
require('codemirror/addon/fold/brace-fold');
require('codemirror/addon/dialog/dialog');
require('codemirror/addon/search/search');
require('codemirror/keymap/sublime');

const PersistedRequest = styled.div`
  flex: 1;
  height: calc(100% - 30px) !important;
  width: 50%;
  overflow-y: auto;
`;


export default class PersistedQueryEditor extends React.Component {
  constructor () {
    super(...arguments);
    autobind(this);
    this.editor = null;
    this.value = '';
  }

  handleOnchange () {
    const value = this.editor.getCodeMirror().doc.getValue();
    this.props.handleOnChange(value);
  }

  render () {
    const { selectedPersisted } = this.props;

    return (
      <PersistedRequest>
        <CodeMirror
          
          ref={editor => {
            this.editor = editor;
          }}
          autoFocus={true}
          autoSave={true}
          onChange={this.handleOnchange}
          preserveScrollPosition={true}
          value={selectedPersisted.query}
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
      </PersistedRequest>
    );
  }
}
