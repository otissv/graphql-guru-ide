import React from 'react';
import autobind from 'class-autobind';
import PersistedQueryEditor from './Query-persisted';
import PersistedResultEditor from './Result-persisted';
import styled from 'styled-components';
import IconButton from '../../../styled/components/IconButton';
import '../css/style-persisted.css';
import runIcon from '../../../icons/controller-play.svg';
import cogIcon from '../../../icons/cog.svg';
import prettifyIcon from '../../../icons/flash.svg';
import refreshIcon from '../../../icons/ccw.svg';
import saveIcon from '../../../icons/save.svg';
import infoIcon from '../../../icons/info.svg';

const Toolbar = styled.ul`
  padding: 0 20px;
  margin: 0;
`;

const ToolbarItem = styled.li`
  display: inline;
`;

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
      handleOnChangeQuery,
      handleOnChangeRequest,
      handlePrettifyClick,
      handleResetClick,
      handleSaveClick,
      selectedPersisted
    } = this.props;

    return (
      <div className="Persisted">
        <div>
          <Toolbar>
            <ToolbarItem className="Editor-toolbar-item">
              <IconButton
                title="Execute Query"
                onClick={fetchGraphql}
                src={runIcon}
              />
            </ToolbarItem>
            <ToolbarItem className="Editor-toolbar-item">
              <IconButton
                title="Prettify Query"
                src={prettifyIcon}
                onClick={handlePrettifyClick}
              >
                <i className="Settings-icon icon-magic"></i>
              </IconButton>
            </ToolbarItem>
            <ToolbarItem className="Editor-toolbar-item">
              <IconButton
                title="Save Query"
                src={saveIcon}
                onClick={handleSaveClick}
              >
                <i className="Settings-icon icon-floppy"></i>
              </IconButton>
            </ToolbarItem>
            <ToolbarItem className="Editor-toolbar-item">
              <IconButton
                title="Reset Query"
                src={refreshIcon}
                onClick={handleResetClick}
              >
                <i className="Settings-icon icon-arrows-ccw"></i>
              </IconButton>
            </ToolbarItem>
            <ToolbarItem className="Editor-toolbar-item">
              <IconButton
                title="Query Information"
                src={infoIcon}
                onClick={handleInfoClick}
              >
                <i className="Settings-icon icon-info-circled"></i>
              </IconButton>
            </ToolbarItem>
          </Toolbar>
        </div>
        <PersistedQueryEditor
          selectedPersisted={selectedPersisted}
          handleOnChange={handleOnChangeQuery}
        />
        <PersistedResultEditor
          selectedPersisted={selectedPersisted}
          handleOnChange={handleOnChangeRequest}
        />
      </div>
    );
  }
}
