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
import settingsIcon from '../../../icons/cog.svg';
import prettifyIcon from '../../../icons/flash.svg';
import refreshIcon from '../../../icons/ccw.svg';
import saveIcon from '../../../icons/save.svg';
import infoIcon from '../../../icons/info.svg';

const Toolbar = styled.div`
  padding: 5px 10px;
  height: 40px;
  position: absolute;
  top: 0;
  left: 230px;
  right: 0;
`;

const SettingButton = styled.div`
  float: right;
  transform: translateY(-4px);
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
  top: 40px;
`;

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

  setInfoModal () {
    this.props.setInfoModal(true);
  }

  setSettingsModal () {
    this.props.setSettingsModal(true);
  }

  render () {
    const {
      forms,
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
      setInfoModal,
      setSaveModal,
      sidebarQueryContent,
      showSidebarQueryHistory,
      showSidebarQueryCollection,
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
          showSidebarQueryHistory={showSidebarQueryHistory}
          showSidebarQueryCollection={showSidebarQueryCollection}
          type={sidebarQueryContent}
        />
        <Toolbar>
          <ToolbarHeader>
            {selectedQuery.name || 'Unnamed'} {' '}
            {selectedQuery.id ? `- ${selectedQuery.id}` : null}{' '}
          </ToolbarHeader>
          <SettingButton>
            <IconButton src={settingsIcon} onClick={this.setSettingsModal} />
          </SettingButton>
        </Toolbar>

        <Container>
          <GraphiQL {...this.props}>
            <GraphiQL.Toolbar id="graphiql-query-editor">
              <IconButton onClick={handleClickPrettify} src={prettifyIcon} />
              <IconButton onClick={this.openSaveModel} src={saveIcon} />
              <IconButton onClick={handleClickRest} src={refreshIcon} />
              <IconButton onClick={this.setInfoModal} src={infoIcon} />
            </GraphiQL.Toolbar>

            <GraphiQL.Footer>
              {status ? ' Status:' : null} {' '}
              <span style={{ color: '#E10098' }}>{status}</span>
              {time ? ' Time:' : null} {' '}
              <span style={{ color: '#E10098' }}>
                {time ? `${time}  ms` : null}
              </span>
            </GraphiQL.Footer>
          </GraphiQL>
        </Container>

        <SaveModal
          opened={uiQuery.isSaveModalOpen}
          collectionLabels={this.collectionLabels()}
          handleClickSave={handleClickSave}
          forms={forms}
          setSaveModal={setSaveModal}
          handleChangeCollection={handleChangeCollection}
          handleChangeInputCollection={handleChangeInputCollection}
          queryCollection={queryCollection}
          validation={validateSaveModule}
          selectedQuery={selectedQuery}
        />

        <InfoModal
          setInfoModal={setInfoModal}
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
