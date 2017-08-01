import React, { PureComponent } from 'react';
import CodeMirror from 'react-codemirror';
import autobind from 'class-autobind';
import styled from 'styled-components';
import '../../../../node_modules/codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/search/search';
import 'codemirror/keymap/sublime';

const PersistedResult = styled.div`
  height: calc(100% - 30px) !important;
  overflow-y: auto;
`;

export default class PersistedResultEditor extends PureComponent {
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
    const results = selectedPersisted.results.response
      ? JSON.stringify(selectedPersisted.results.response, null, 2)
      : '';

    return (
      <PersistedResult>
        <CodeMirror
          ref={editor => {
            this.editor = editor;
          }}
          preserveScrollPosition={true}
          value={results}
          autoSave={true}
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
            lineWrapping: true,
            matchBrackets: true,
            mode: 'application/json',
            readOnly: true,
            tabSize: 2,
            theme: 'dracula'
          }}
        />
      </PersistedResult>
    );
  }
}
