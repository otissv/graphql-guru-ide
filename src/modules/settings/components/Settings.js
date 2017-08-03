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

const Section = styled.div`
  padding-top: 10px;
  margin-bottom: 10px;
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
          <Section>Request</Section>

          <Checkbox
            name="clearRequestCollection"
            styledLabel={styledLabel}
            checked={forms.settingsForm.fields.clearRequestCollection.value}
          >
            Clear request collections
          </Checkbox>
          <Checkbox
            name="clearRequestHistory"
            styledLabel={styledLabel}
            checked={forms.settingsForm.fields.clearRequestHistory.value}
          >
            Clear request history
          </Checkbox>

          <Section>Persisted</Section>
          <Checkbox
            name="clearPersistedCollection"
            styledLabel={styledLabel}
            checked={forms.settingsForm.fields.clearPersistedCollection.value}
          >
            Clear persisted collections
          </Checkbox>

          <Checkbox
            name="clearPersistedHistory"
            styledLabel={styledLabel}
            checked={forms.settingsForm.fields.clearPersistedHistory.value}
          >
            Clear persisted history
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
