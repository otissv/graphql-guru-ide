import React from 'react';
import autobind from 'class-autobind';
import RequestPersistedEditor from './Request-persisted';
import PersistedResultEditor from './Result-persisted';
import styled from 'styled-components';
import IconButton from '../../../styled/components/IconButton';
import '../css/style-persisted.css';
import runIcon from '../../../icons/controller-play.svg';
import prettifyIcon from '../../../icons/flash.svg';
import refreshIcon from '../../../icons/ccw.svg';
import saveIcon from '../../../icons/save.svg';
import infoIcon from '../../../icons/info.svg';
import Editor from '../../shared/components/Editor/Editor-shared';
import Connection from '../../shared/components/Connection-shared';

const EditorToolbar = styled.ul`
  position: absolute;
  left: 230px;
  top: 80px;
  padding: 0 20px 0 0;
  margin: 0;
`;

const EditorToolbarItem = styled.li`display: inline;`;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 230px;
  right: 0;
  top: 120px;
  overflow: hidden;
  display: flex;
`;

const Result = styled.div`
  flex: 1;
  border-left: ${props => props.theme.borders.thinSecondary};
  width: 50%;
`;

const ResultFooter = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 4px 20px;
  backgroud: ${props => props.theme.colors.background}
`;


const HistoryInfo = props =>
  <div>
    <p>Use the query editor to left to send queries to the server.</p>
    <p>
      Queries typically start with a {`"{"`} character. Lines that start with a
      # are ignored.
    </p>
    <p>An example query might look like:</p>
    <pre>
      {`}
  User {
    id
    firstName
    lastName
  }
}`}
    </pre>

    <p>
      Keyboard shortcuts:<br />
      <br />
      Run Persisted: Ctrl-Enter or press the play button above the query editor.<br
      />
      <br />
      Auto Complete: Ctrl-Space or just start typing.`}
    </p>
  </div>;

const CollectionInfo = props => <div>Save queries to create collections</div>;

export default class PersistedEditor extends React.PureComponent {
  constructor () {
    super(...arguments);
    autobind(this);
  }

  execute () {
    
  }

  openSaveModel (bool) {
    const { selectedPersisted, setPersistedResultProps, setUiPersistedProps } = this.props; 

    if (selectedPersisted.query.trim() === '') {
      setPersistedResultProps({ response: 'Please provide a persisted query.' });
    } else {
      setUiPersistedProps({ isSaveModalOpen: bool });
    }
  }

  openInfoModal (bool) {
    this.props.setUiPersistedProps({ isInfoModalOpen: bool });
  }

  render () {
    const {
      fetcher,
      forms,
      getGraphqlSchema,
      handleChangeCollection,
      handleChangeInputCollection,
      handleClickPrettify,
      handleClickRest,
      handleClickSave,
      handleOnChangePersisted,
      handleOnChangeRequest,
      handlePersistedCollectionItemClick,
      handlePersistedHistoryItemClick,
      isConnected,
      persistedCollection,
      persistedCollectionAll,
      persistedHistoryAll,
      selectedPersisted,
      setGraphqlSchema,
      setSelectedPersistedProps,
      setSchemaIsConnected,
      setSettingsModal,
      showSidebarPersistedCollection,
      showSidebarPersistedHistory,
      uiPersistedEditor,
      validateSaveModule,
    } = this.props;
    
    const { sidebarPersistedContent } = uiPersistedEditor;
    const { status, time } = selectedPersisted.results || {};

    return (
      <Editor
        collectionInfo={<CollectionInfo />}
        collections={persistedCollectionAll}
        history={persistedHistoryAll}
        historyInfo={<HistoryInfo />}

        onCollectionItemClick={handlePersistedCollectionItemClick}
        onHistoryItemClick={handlePersistedHistoryItemClick}
        showSidebarCollection={showSidebarPersistedCollection}
        showSidebarHistory={showSidebarPersistedHistory}
        sidebarType={sidebarPersistedContent}
        
        selectedItem={selectedPersisted}
        setSettingsModal={setSettingsModal}
        getGraphqlSchema={getGraphqlSchema}
        setEndpoint={setSelectedPersistedProps}
        setGraphqlSchema={setGraphqlSchema}
        setSchemaIsConnected={setSchemaIsConnected}

        collection={persistedCollection}
        forms={forms}  
        handleChangeCollection={handleChangeCollection}
        handleChangeInputCollection={handleChangeInputCollection}
        handleClickSave={handleClickSave}
        saveModalHeader="Save persisted"
        saveModalOpened={uiPersistedEditor.isSaveModalOpen}
        setSaveModel={this.openSaveModel}
        validation={validateSaveModule}
    
        infoModalOpened={uiPersistedEditor.isInfoModalOpen}
        infoModalHeader="Persisted Info"
        result={selectedPersisted.results}
        setInfoModal={this.openInfoModal}
      >
      <EditorToolbar>
        <EditorToolbarItem className="Editor-toolbar-item">
          <IconButton
            title="Execute Persisted"
            onClick={fetcher}
            src={runIcon}
          />
        </EditorToolbarItem>
        <EditorToolbarItem className="Editor-toolbar-item">
          <IconButton
            title="Prettify Persisted"
            src={prettifyIcon}
            onClick={handleClickPrettify}
          >
            <i className="Settings-icon icon-magic"></i>
          </IconButton>
        </EditorToolbarItem>
        <EditorToolbarItem className="Editor-toolbar-item">
          <IconButton
            title="Save Persisted"
            src={saveIcon}
            onClick={this.openSaveModel}
          >
            <i className="Settings-icon icon-floppy"></i>
          </IconButton>
        </EditorToolbarItem>
        <EditorToolbarItem className="Editor-toolbar-item">
          <IconButton
            title="Reset Persisted"
            src={refreshIcon}
            onClick={handleClickRest}
          >
            <i className="Settings-icon icon-arrows-ccw"></i>
          </IconButton>
        </EditorToolbarItem>
        <EditorToolbarItem className="Editor-toolbar-item">
          <IconButton
            title="Persisted Information"
            src={infoIcon}
            onClick={this.openInfoModal}
          >
            <i className="Settings-icon icon-info-circled"></i>
          </IconButton>
        </EditorToolbarItem>
      </EditorToolbar>
      <Container>
          <RequestPersistedEditor
            selectedPersisted={selectedPersisted}
            handleOnChange={handleOnChangePersisted}
          />
          <Result>
            <PersistedResultEditor
              selectedPersisted={selectedPersisted}
              handleOnChange={handleOnChangeRequest}
            />
            <ResultFooter>
              <Connection 
                isConnected={isConnected}
                status={status}
                time={time}
              />
            </ResultFooter>
          </Result>
          
        </Container>        
      </Editor>
      
    );
  }
}
