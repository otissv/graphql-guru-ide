import React, { PureComponent } from 'react';
import autobind from 'class-autobind';
import GraphiQL from 'graphiql';
import styled from 'styled-components';
import '../../../../node_modules/graphiql/graphiql.css';
import '../css/graphiql-guru.css';
import IconButton from '../../../styled/components/IconButton';
import prettifyIcon from '../../../icons/flash.svg';
import refreshIcon from '../../../icons/ccw.svg';
import saveIcon from '../../../icons/save.svg';
import infoIcon from '../../../icons/info.svg';
import Editor from '../../shared/components/Editor/Editor-shared';
import Connection from '../../shared/components/Connection-shared';

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 230px;
  right: 0;
  top: 80px;
`;

const HistoryInfo = props => 
  <div>
    <p> Use the query editor to left to send queries to the server. </p> 
    <p>
      Queries typically start with a {`"{"`} character. 
      Lines that start with a# are ignored. 
    </p> 
    <p> An example query might look like: </p> 
    <pre> {
      `}
  User {
    id
    firstName
    lastName
  }
}`
      } 
    </pre>

    <p>
    Keyboard shortcuts: <br />
    <br />
    Run Query: Ctrl - Enter or press the play button above the query editor. <br />
    <br />
    Auto Complete: Ctrl - Space or just start typing.
    </p>
  </div>
;

const CollectionInfo = props => <p>Save queries to create collections</p>;

class CustomGraphiQL extends PureComponent {
  constructor (props) {
    super(...arguments);
    autobind(this);
  }

  openSaveModel () {
    const { selectedQuery, setQueryResultProps, setUiQueryProps, setSaveFormFields } = this.props; 

    setSaveFormFields({
      name: { value: selectedQuery.name },
      collection: { value: selectedQuery.collection },
      description: { value: selectedQuery.description }
    });

    if (selectedQuery.query.trim() === '') {
      setQueryResultProps({ response: 'Please provide a query.' });
    } else {
      setUiQueryProps({ isSaveModalOpen: true });
    }
  }

  openInfoModal () {
    this.props.setUiQueryProps({ isInfoModalOpen: true });
  }
  
  setInfoModal (bool) {
    this.props.setUiQueryProps({ isInfoModalOpen: bool });
  }

  setSaveModal (bool) {
    this.props.setUiQueryProps({ isSaveModalOpen: bool });

    const { selectedQuery, setQueryResultProps, setUiQueryProps } = this.props; 

    if (selectedQuery.query.trim() === '') {
      setQueryResultProps({ response: 'Please provide a query.' });
    } else {
      setUiQueryProps({ isSaveModalOpen: bool });
    }
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
      isConnected,
      queryCollection,
      queryCollectionAll,
      queryHistoryAll,
      result,
      selectedQuery,
      setSaveFormFields,
      setSelectedQueryProps,
      setGraphqlSchema,
      setSchemaIsConnected,
      setSettingsModal,
      showSidebarQueryCollection,
      showSidebarQueryHistory,
      uiQueryEditor,
      validateSaveModule
    } = this.props;
    
    const { sidebarQueryContent } = uiQueryEditor;
    const { status, time } = result || {};

    return (
      <Editor
        collectionInfo={<CollectionInfo />}
        collections={queryCollectionAll}
        history={queryHistoryAll}
        historyInfo={<HistoryInfo />}

        onCollectionItemClick={handleQueryCollectionItemClick}
        onHistoryItemClick={handleQueryHistoryItemClick}
        showSidebarCollection={showSidebarQueryCollection}
        showSidebarHistory={showSidebarQueryHistory}
        sidebarType={sidebarQueryContent}
        
        selectedItem={selectedQuery}
        setSettingsModal={setSettingsModal}
        getGraphqlSchema={getGraphqlSchema}
        setEndpoint={setSelectedQueryProps}
        setGraphqlSchema={setGraphqlSchema}
        setSchemaIsConnected={setSchemaIsConnected}

        collection={queryCollection}
        forms={forms}  
        handleChangeCollection={handleChangeCollection}
        handleChangeInputCollection={handleChangeInputCollection}
        handleClickSave={handleClickSave}
        saveModalHeader="Save query"
        saveModalOpened={uiQueryEditor.isSaveModalOpen}
        setSaveFormFields={setSaveFormFields}
        validation={validateSaveModule}
    
        infoModalOpened={uiQueryEditor.isInfoModalOpen}
        infoModalHeader="Query Info"
        result={result}
        setInfoModal={this.setInfoModal}
        setSaveModel={this.setSaveModal}
      >
        <Container>
          <GraphiQL {...this.props}>
            <GraphiQL.Toolbar id="graphiql-query-editor">
              <IconButton onClick={handleClickPrettify} src={prettifyIcon} />
              <IconButton onClick={this.openSaveModel} src={saveIcon} />
              <IconButton onClick={handleClickRest} src={refreshIcon} />
              <IconButton onClick={this.openInfoModal} src={infoIcon} />
            </GraphiQL.Toolbar>

            <GraphiQL.Footer>
              <Connection 
                isConnected={isConnected}
                status={status}
                time={time}
              />
            </GraphiQL.Footer>
          </GraphiQL>
        </Container>
      </Editor>
    );
  }
}

export default CustomGraphiQL;
