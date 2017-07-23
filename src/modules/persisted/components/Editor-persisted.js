import React from 'react';
import autobind from 'class-autobind';
import QueryPersistedEditor from './Query-persisted';
import PersistedResultEditor from './Result-persisted';
import styled from 'styled-components';
import IconButton from '../../../styled/components/IconButton';
import '../css/style-persisted.css';
import runIcon from '../../../icons/controller-play.svg';
import prettifyIcon from '../../../icons/flash.svg';
import refreshIcon from '../../../icons/ccw.svg';
import saveIcon from '../../../icons/save.svg';
import infoIcon from '../../../icons/info.svg';
import settingsIcon from '../../../icons/cog.svg';
import EditorSidebar from '../../shared/components/Sidebar-shared';

const EditorToolbar = styled.ul`
  position: absolute;
  left: 230px;
  top: 40px;
  padding: 0 20px 0 0;
  margin: 0;
`;

const EditorToolbarItem = styled.li`display: inline;`;

const Toolbar = styled.div`
  padding: 5px 10px;
  height: 40px;
  position: absolute;

  left: 230px;
  right: 0;
`;

const ToolbarHeader = styled.h1`
  font-weight: bold;
  font-size: 12px;
  color: ${props => props.theme.colors.primary};
  float: left;
`;

const Container = styled.div`
  position: absolute;
  bottom: 30px;
  left: 230px;
  right: 0;
  top: 80px;
`;

const SettingButton = styled.div`
  float: right;
  transform: translateY(-4px);
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
      Run Query: Ctrl-Enter or press the play button above the query editor.<br
      />
      <br />
      Auto Complete: Ctrl-Space or just start typing.`}
    </p>
  </div>;

const CollectionInfo = props => <div>Save queries to create collections</div>;

export default class Persisted extends React.PureComponent {
  constructor () {
    super(...arguments);
    autobind(this);
  }

  handleInfoClick () {}

  render () {
    const {
      fetchGraphql,
      handleInfoClick,
      handleOnChangePersisted,
      handleOnChangeRequest,
      handlePrettifyClick,
      handleResetClick,
      handleSaveClick,
      selectedPersisted,
      persistedCollectionAll,
      persistedHistoryAll,
      handlePersistedCollectionItemClick,
      handlePersistedHistoryItemClick,
      showSidebarPersistedHistory,
      showSidebarPersistedCollection,
      sidebarPersistedContent
    } = this.props;

    return (
      <div className="Persisted">
        <div>
          <EditorSidebar
            collections={persistedCollectionAll}
            history={persistedHistoryAll}
            onCollectionItemClick={handlePersistedCollectionItemClick}
            onHistoryItemClick={handlePersistedHistoryItemClick}
            showSidebarHistory={showSidebarPersistedHistory}
            showSidebarCollection={showSidebarPersistedCollection}
            type={sidebarPersistedContent}
            historyInfo={<HistoryInfo />}
            collectionInfo={<CollectionInfo />}
          />
          <Toolbar>
            <ToolbarHeader>
              {selectedPersisted.name || 'Unnamed'} {' '}
              {selectedPersisted.id ? `- ${selectedPersisted.id}` : null}{' '}
            </ToolbarHeader>
            <SettingButton>
              <IconButton src={settingsIcon} onClick={this.setSettingsModal} />
            </SettingButton>
          </Toolbar>

          <EditorToolbar>
            <EditorToolbarItem className="Editor-toolbar-item">
              <IconButton
                title="Execute Persisted"
                onClick={fetchGraphql}
                src={runIcon}
              />
            </EditorToolbarItem>
            <EditorToolbarItem className="Editor-toolbar-item">
              <IconButton
                title="Prettify Persisted"
                src={prettifyIcon}
                onClick={handlePrettifyClick}
              >
                <i className="Settings-icon icon-magic"></i>
              </IconButton>
            </EditorToolbarItem>
            <EditorToolbarItem className="Editor-toolbar-item">
              <IconButton
                title="Save Persisted"
                src={saveIcon}
                onClick={handleSaveClick}
              >
                <i className="Settings-icon icon-floppy"></i>
              </IconButton>
            </EditorToolbarItem>
            <EditorToolbarItem className="Editor-toolbar-item">
              <IconButton
                title="Reset Persisted"
                src={refreshIcon}
                onClick={handleResetClick}
              >
                <i className="Settings-icon icon-arrows-ccw"></i>
              </IconButton>
            </EditorToolbarItem>
            <EditorToolbarItem className="Editor-toolbar-item">
              <IconButton
                title="Persisted Information"
                src={infoIcon}
                onClick={handleInfoClick}
              >
                <i className="Settings-icon icon-info-circled"></i>
              </IconButton>
            </EditorToolbarItem>
          </EditorToolbar>
        </div>
        <Container>
          <QueryPersistedEditor
            selectedPersisted={selectedPersisted}
            handleOnChange={handleOnChangePersisted}
          />
          <PersistedResultEditor
            selectedPersisted={selectedPersisted}
            handleOnChange={handleOnChangeRequest}
          />
        </Container>
      </div>
    );
  }
}
