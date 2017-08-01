import React, {
  PureComponent
} from 'react';
import autobind from 'class-autobind';
import styled from 'styled-components';
import EditorToolbar from './Editor-toolbar-shared';
import EditorSideBar from './Editor-sidebar-shared';
import InfoModal from '../Info-modal-shared';
import SaveModal from '../Save-modal-shared';
import Settings from '../../../settings/containers/container-settings';

const EditorContainer = styled.div ``;

export default class Editor extends PureComponent {
  constructor (props) {
    super(...arguments);
    autobind(this);
  }

  collectionLabels () {
    return Object.keys(this.props.collections).map(key => ({
      label: key,
      value: key
    }));
  }

  render () {
    const {
      children,

      collectionInfo,
      collections,
      history,
      historyInfo,

      onCollectionItemClick,
      onHistoryItemClick,
      showSidebarCollection,
      showSidebarHistory,
      sidebarType,
      
      selectedItem,
      setSettingsModal,
      getGraphqlSchema,
      setEndpoint,
      setGraphqlSchema,
      setSchemaIsConnected,

      collection,
      forms,  
      handleChangeCollection,
      handleChangeInputCollection,
      handleClickSave,
      saveModalHeader,
      saveModalOpened,
      validation,
  
      infoModalHeader,
      infoModalOpened,
      setInfoModal,
      setSaveModel
      
    } = this.props;

    return (
      <EditorContainer>
        <EditorSideBar 
        collectionInfo={collectionInfo}
        collections={collections}
        history={history}
        historyInfo={historyInfo}
        
        onCollectionItemClick={onCollectionItemClick}
        onHistoryItemClick={onHistoryItemClick}
        showSidebarCollection={showSidebarCollection}
        showSidebarHistory={showSidebarHistory}
        type={sidebarType}
      /> 
      <EditorToolbar 
        {...selectedItem}
        setSettingsModal={setSettingsModal}
        getGraphqlSchema={getGraphqlSchema}
        setEndpoint={setEndpoint}
        setGraphqlSchema={setGraphqlSchema}
        setSchemaIsConnected={setSchemaIsConnected}
        />

        {children}

        <SaveModal
          collection={collection}
          collectionLabels={this.collectionLabels()}
          forms={forms}
          handleChangeCollection={handleChangeCollection}
          handleChangeInputCollection={handleChangeInputCollection}
          handleClickSave={handleClickSave}
          opened={saveModalOpened}
          saveModalHeader={saveModalHeader}
          selectedItem={selectedItem}
          setSaveModel={setSaveModel}
          validation={validation}
        />

        <InfoModal
          infoModalHeader={infoModalHeader}
          opened={infoModalOpened}
          result={selectedItem.results}
          selectedItem={selectedItem}
          setInfoModal={setInfoModal} 
        />  
        <Settings />
      </EditorContainer>
    );
  }
}


