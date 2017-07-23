import React from 'react';
import GraphiQL from 'graphiql';
import autobind from 'class-autobind';
import styled from 'styled-components';
import InfoModal from '../../shared/components/Info-modal-shared';
import SaveModal from '../../shared/components/Save-modal-shared';
import EditorSidebar from '../../shared/components/Sidebar-shared';
import Settings from '../../settings/containers/container-settings';
import '../../../../node_modules/graphiql/graphiql.css';
import '../css/graphiql-guru.css';
import IconButton from '../../../styled/components/IconButton';
import prettifyIcon from '../../../icons/flash.svg';
import refreshIcon from '../../../icons/ccw.svg';
import saveIcon from '../../../icons/save.svg';
import infoIcon from '../../../icons/info.svg';
import EditorToolbar from '../../shared/components/Editor-toolbar-shared';

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 230px;
  right: 0;
  top: 80px;
`;

const Error = styled.span`
  color: #f00;
  float: right;
  padding: 7px 20px;
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

const CollectionInfo = props => <p>Save queries to create collections</p>;

class CustomGraphiQL extends React.Component {
  constructor (props) {
    super(...arguments);
    autobind(this);
  }

  collectionLabels () {
    return Object.keys(this.props.queryCollectionAll).map(key => ({
      label: key,
      value: key
    }));
  }

  openSaveModel () {
    this.props.openSaveModel();
  }

  setQueryInfoModal () {
    this.props.setQueryInfoModal(true);
  }

  render () {
    const {
      forms,
      getGraphqlSchema,
      handleChangeCollection,
      handleChangeInputCollection,
      handleClickPrettify,
      handleClickRest,
      handleClickSave,
      handleQueryCollectionItemClick,
      handleQueryHistoryItemClick,
      queryCollection,
      queryCollectionAll,
      queryHistoryAll,
      result,
      selectedQuery,
      setQueryEndpoint,
      setGraphqlSchema,
      setQueryInfoModal,
      setQuerySaveModel,
      setSchemaIsConnected,
      setSettingsModal,
      showSidebarQueryCollection,
      showSidebarQueryHistory,
      sidebarQueryContent,
      uiQuery,
      validateSaveModule
    } = this.props;

    const { status, time } = result;

    return (
      <div>
        <EditorSidebar
          collections={queryCollectionAll}
          history={queryHistoryAll}
          onCollectionItemClick={handleQueryCollectionItemClick}
          onHistoryItemClick={handleQueryHistoryItemClick}
          showSidebarHistory={showSidebarQueryHistory}
          showSidebarCollection={showSidebarQueryCollection}
          type={sidebarQueryContent}
          historyInfo={<HistoryInfo />}
          collectionInfo={<CollectionInfo />}
        />
        <EditorToolbar
          {...selectedQuery}
          setSettingsModal={setSettingsModal}
          getGraphqlSchema={getGraphqlSchema}
          setQueryEndpoint={setQueryEndpoint}
          setGraphqlSchema={setGraphqlSchema}
          setSchemaIsConnected={setSchemaIsConnected}
        />
        <Container>
          <GraphiQL {...this.props}>
            <GraphiQL.Toolbar id="graphiql-query-editor">
              <IconButton onClick={handleClickPrettify} src={prettifyIcon} />
              <IconButton onClick={this.openSaveModel} src={saveIcon} />
              <IconButton onClick={handleClickRest} src={refreshIcon} />
              <IconButton onClick={this.setQueryInfoModal} src={infoIcon} />
            </GraphiQL.Toolbar>

            <GraphiQL.Footer>
              {this.props.isConnected
                ? <span>
                    {status ? `Status: ${status}` : null}
                    {time ? ' Time:' : null} {time ? `${time}  ms` : null}
                  </span>
                : <Error className="GraphQL-connected">Schema not found</Error>}
            </GraphiQL.Footer>
          </GraphiQL>
        </Container>

        <SaveModal
          opened={uiQuery.isSaveModalOpen}
          collectionLabels={this.collectionLabels()}
          handleClickSave={handleClickSave}
          forms={forms}
          setSaveModel={setQuerySaveModel}
          handleChangeCollection={handleChangeCollection}
          handleChangeInputCollection={handleChangeInputCollection}
          queryCollection={queryCollection}
          validation={validateSaveModule}
          selectedQuery={selectedQuery}
        />

        <InfoModal
          setInfoModal={setQueryInfoModal}
          opened={uiQuery.isInfoModalOpen}
          result={result}
          selectedQuery={selectedQuery}
        />

        <Settings />
      </div>
    );
  }
}

export default CustomGraphiQL;
