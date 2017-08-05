import React, { PureComponent } from 'react';
import autobind from 'class-autobind';
import styled from 'styled-components';
import settingsIcon from '../../../../icons/cog.svg';
import Input from '../../../../styled/components/Input';
import IconButton from '../../../../styled/components/IconButton';
import Icon from '../../../../styled/components/Icon';
import dotSingle from '../../../../icons/dot-single.svg';


const Toolbar = styled.div`
  padding: 5px 10px;
  height: 80px;
  position: absolute;
  top: 0;
  left: 230px;
  right: 0;
  display: flex;
  flex-direction: column;
`;

const ToolbarRow = styled.div`flex: 1;`;

const ToolbarHeader = styled.h1`
  font-weight: bold;
  font-size: ${props => props.theme.fonts.size.small};
  color: ${props => props.theme.colors.primary};
  float: left;
`;

const EndPointLabel = styled.label`
  font-size: ${props => props.theme.fonts.size.small};
`;

const SettingButton = styled.div`
  float: right;
  transform: translateY(-4px);
`;

export default class EditorToolbar extends PureComponent {
  constructor (props) {
    super(...arguments);
    autobind(this);
  }

  componentDidMount () {
    this.fetchSchema(this.props.endpoint);
  }

  handleChangeEndpoint (event) {
    const endpointValue = event.nativeEvent.target.value;

    if (
      endpointValue &&
      this.props.endpoint !== endpointValue &&
      endpointValue.trim() !== ''
    ) {
      this.fetchSchema(endpointValue);
    }
  }

  fetchSchema (endpoint) {
    const {
      getGraphqlSchema,
      setEndpoint,
      setGraphqlSchema,
      setSchemaIsConnected
    } = this.props;
    
    setEndpoint({ endpoint });
    getGraphqlSchema(endpoint).payload
      .then(response => {
        if (response.data && response.data.__schema) {
          setGraphqlSchema(response.data);
          setSchemaIsConnected(true);
        }
      })
      .catch(error => {
        console.log(error);
        setGraphqlSchema({});
        setSchemaIsConnected(false);
      });
  }

  setSettingsModal () {
    this.props.setSettingsModal(true);
  }

  render () {
    const { dirty, name, endpoint } = this.props;

    const dirtyIcon = dirty
      ? <Icon src={dotSingle} />
      : null;

    return (
      <Toolbar>
        <ToolbarRow>
          <ToolbarHeader>
           {dirtyIcon}{name || 'Unnamed'}
          </ToolbarHeader>
        </ToolbarRow>
        <ToolbarRow>
          <EndPointLabel>Endpoint:</EndPointLabel>
          <Input
            size="small"
            styledInput="width: 300px"
            onChange={this.handleChangeEndpoint}
            value={endpoint}
          />
          <SettingButton>
            <IconButton src={settingsIcon} onClick={this.setSettingsModal} />
          </SettingButton>
        </ToolbarRow>
      </Toolbar>
    );
  }
}
