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

export default class PersistedResultEditor extends React.PureComponent {
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
      <div className="Persisted-result">
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
            lineNumbers: true,
            lineWrapping: true,
            matchBrackets: true,
            mode: 'application/json',
            readOnly: true,
            tabSize: 2,
            theme: 'dracula'
          }}
        />
      </div>
    );
  }
}
