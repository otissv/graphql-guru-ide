import React from 'react';
import CodeMirror from 'react-codemirror';
import autobind from 'class-autobind';
import '../../../../node_modules/codemirror/lib/codemirror.css';
require('codemirror/mode/javascript/javascript');
require('codemirror/addon/fold/foldgutter');
require('codemirror/addon/fold/brace-fold');
require('codemirror/addon/dialog/dialog');
require('codemirror/addon/search/search');
require('codemirror/keymap/sublime');

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
      <div className="Persisted-query">
        <CodeMirror
          ref={editor => {
            this.editor = editor;
          }}
          autoFocus={true}
          autoSave={true}
          onChange={this.handleOnchange}
          preserveScrollPosition={true}
          value={selectedPersisted && selectedPersisted.query}
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
            lineWrapping: true,
            matchBrackets: true,
            mode: 'application/json',
            showCursorWhenSelecting: true,
            tabSize: 2,
            theme: 'dracula'
          }}
        />
      </div>
    );
  }
}
