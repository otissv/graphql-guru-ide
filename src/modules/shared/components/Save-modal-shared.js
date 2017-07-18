import React, { PureComponent } from 'react';
import autobind from 'class-autobind';
import { Creatable } from 'react-select';
import Modal from '../../../styled/components/Modal';
import 'react-select/dist/react-select.css';
import ReduxForm from '../../shared/components/ReduxForm-shared';
import FormLabel from '../../../styled/FormLabel-styled';
import Input from '../../../styled/Input-styled';
import FormRow from '../../../styled/FormRow-styled';
import FormError from '../../../styled/FormError-styled';
import Textarea from '../../../styled/Textarea-styled';
import Button from '../../../styled/Button-styled';
import cuid from 'cuid';

const footerStyled = `
      display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-end;
`;

export default class SaveModal extends PureComponent {
  constructor (props) {
    super(...arguments);
    autobind(this);
  }

  handleOnClickCancel (event) {
    event.preventDefault();
    this.props.setSaveModal(false);
  }

  render () {
    const {
      collectionLabels,
      forms,
      handleChangeCollection,
      handleChangeInputCollection,
      handleClickSave,
      opened,
      queryCollection,
      selectedQuery,
      setSaveModal,
      validation
    } = this.props;

    return (
      <Modal
        cancel={{ onClick: this.handleOnClickCancel }}
        id={cuid()}
        header="Save Query"
        opened={opened}
        setVisibility={setSaveModal}
      >
        <ReduxForm
          name="saveForm"
          onSubmit={handleClickSave}
          validation={validation}
        >
          <FormRow>
            <FormLabel htmlFor="name">Name</FormLabel>

            <Input
              name="name"
              value={forms.saveForm.fields.name.value || selectedQuery.name}
            />

            <FormError
              display={forms.saveForm.fields.name.error ? 'block' : 'none'}
            >
              {forms.saveForm.fields.name.error}
            </FormError>
          </FormRow>

          <FormRow>
            <FormLabel htmlFor="name">Collection</FormLabel>

            <Creatable
              options={collectionLabels}
              value={queryCollection}
              onInputChange={handleChangeInputCollection}
              onChange={handleChangeCollection}
              name="collection"
            />

            <FormError
              display={
                forms.saveForm.fields.collection.error ? 'block' : 'none'
              }
            >
              {forms.saveForm.fields.name.error}
            </FormError>
          </FormRow>

          <FormRow>
            <FormLabel htmlFor="name">Query Description (optional)</FormLabel>

            <Textarea
              name="description"
              value={
                forms.saveForm.fields.description.value ||
                selectedQuery.description
              }
              placeholder="Adding a description makes your docs better"
            />

            <FormError
              display={
                forms.saveForm.fields.description.error ? 'block' : 'none'
              }
            >
              {forms.saveForm.fields.description.error}
            </FormError>
          </FormRow>

          <FormRow styledFormRow={footerStyled}>
            <Button onClick={this.handleOnClickCancel}>Cancel</Button>

            <Button primary type="submit">
              Save
            </Button>
          </FormRow>
        </ReduxForm>
      </Modal>
    );
  }
}
