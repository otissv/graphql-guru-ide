import React, { PureComponent } from 'react';
import autobind from 'class-autobind';
import Modal from '../../../styled/components/Modal';
import ReduxForm from '../../shared/components/ReduxForm-shared';
import FormLabel from '../../../styled/FormLabel-styled';
import Input from '../../../styled/Input-styled';
import FormRow from '../../../styled/FormRow-styled';
import FormError from '../../../styled/FormError-styled';
import Textarea from '../../../styled/Textarea-styled';
import Button from '../../../styled/Button-styled';
import Select from '../../../styled/components/Select';
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
    this.props.setSaveModel(false);
  }

  render () {
    const {
      collectionLabels,
      forms,
      handleClickSave,
      handleCollectionOptionChange,
      opened,
      saveModalHeader,
      setSaveModel,
      validation
    } = this.props;

    return (
      <Modal
        cancel={{ onClick: this.handleOnClickCancel }}
        id={cuid()}
        header={saveModalHeader}
        opened={opened}
        setVisibility={setSaveModel}
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
              value={forms.saveForm.fields.name.value}
            />

            <FormError
               display={forms.saveForm.fields.name.error ? 'block' : 'none'}
            >
              {forms.saveForm.fields.name.error}
            </FormError>
          </FormRow>

          <FormRow>
            <FormLabel htmlFor="name">Collection</FormLabel>

            <Select
              name="collection"
              value={forms.saveForm.fields.collection.value}
              options={collectionLabels}
              onOptionChange={handleCollectionOptionChange}
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
                forms.saveForm.fields.description.value
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
            <Button
              styledButton="margin-right: 10px;"
              onClick={this.handleOnClickCancel}
            >
              Cancel
            </Button>

            <Button primary type="submit">
              Save
            </Button>
          </FormRow>
        </ReduxForm>
      </Modal>
    );
  }
}

{/* <Creatable
              options={collectionLabels}
              value={collection}
              onInputChange={handleChangeInputCollection}
              onChange={handleChangeCollection}
              name="collection"
            /> */}