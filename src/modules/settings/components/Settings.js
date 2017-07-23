import React from 'react';
import styled from 'styled-components';
import autobind from 'class-autobind';
import cuid from 'cuid';
import Modal from '../../../styled/components/Modal';
import Button from '../../../styled/Button-styled';
import Checkbox from '../../../styled/components/Checkbox';
import ReduxForm from '../../shared/components/ReduxForm-shared';
import FormRow from '../../../styled/FormRow-styled';

const SubHeading = styled.h2`
  font-size: 16px;
  font-weight: normal;
`;

const footerStyled = `
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
`;

const styledLabel = `display: block`;

export default class Settings extends React.PureComponent {
  constructor (props) {
    super(...arguments);
    autobind(this);
  }

  handleOnClickCancel (event) {
    this.props.setSettingsModal(false);
  }

  render () {
    const {
      forms,
      setSettingsModal,
      handleClickSaveSettings,
      uiSettings
    } = this.props;

    return (
      <Modal
        setVisibility={setSettingsModal}
        id={cuid()}
        header="Settings"
        full
        opened={uiSettings.isSettingsModalOpen}
      >
        <ReduxForm name="settingsForm" onSubmit={handleClickSaveSettings}>
          <SubHeading>History</SubHeading>
          <Checkbox
            name="clearQueryHistory"
            styledLabel={styledLabel}
            checked={forms.settingsForm.fields.clearQueryHistory.value}
          >
            Clear query history
          </Checkbox>

          <Checkbox
            name="clearPersistedHistory"
            styledLabel={styledLabel}
            checked={forms.settingsForm.fields.clearPersistedHistory.value}
          >
            Clear persisted history
          </Checkbox>

          <Checkbox
            name="clearQueryCollection"
            styledLabel={styledLabel}
            checked={forms.settingsForm.fields.clearQueryCollection.value}
          >
            Clear collections
          </Checkbox>

          <FormRow styledFormRow={footerStyled}>
            <Button
              styledButton="margin-right: 10px;"
              onClick={this.handleOnClickCancel}
            >
              Cancel
            </Button>

            <Button primary type="submit">
              Clear History
            </Button>
          </FormRow>
        </ReduxForm>
      </Modal>
    );
  }
}
