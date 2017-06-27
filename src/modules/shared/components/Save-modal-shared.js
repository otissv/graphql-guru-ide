import React from 'react';
import autobind from 'class-autobind';
import { Creatable } from 'react-select';
import Modal from '../../../styled/components/Modal';
import 'react-select/dist/react-select.css';
import Form from '../../../styled/Form-styled';
import FormLabel from '../../../styled/FormLabel-styled';
import Input from '../../../styled/Input-styled';
import FormRow from '../../../styled/FormRow-styled';
import Textarea from '../../../styled/Textarea-styled';
import cuid from 'cuid';

export default class SaveModal extends React.PureComponent {
  constructor (props) {
    super(...arguments);
    autobind(this);

    this.state = {
      name: this.props.values.name
    };
  }

  onNameChange (event) {
    const value = event.target.value;
    this.setState({ name });
    this.props.handleChangeQueryName(value);
  }

  render () {
    const {
      collectionLabels,
      handleChangeCollection,
      handleChangeInputCollection,
      handleChangeQueryDescription,
      handleClickSave,
      queryCollection,
      opened,
      values,
      setSaveModal
    } = this.props;

    return (
      <Modal
        setVisibility={setSaveModal}
        id={cuid()}
        header="Save Query"
        cancel={{ body: 'Cancel' }}
        submit={{ onClick: handleClickSave, body: 'Save' }}
        opened={opened}
      >
        <Form>
          <FormRow>
            <FormLabel htmlFor="name">
              Name
            </FormLabel>
            <Input
              id="save-name"
              onChange={this.onNameChange}
              value={this.state.name}
            />
          </FormRow>

          <FormRow>
            <FormLabel htmlFor="name">
              Collection
            </FormLabel>
            <Creatable
              value={queryCollection}
              name="save-collections"
              options={collectionLabels}
              onInputChange={handleChangeInputCollection}
              onChange={handleChangeCollection}
            />
          </FormRow>

          <FormRow>
            <FormLabel htmlFor="name">
              Query Description (optional)
            </FormLabel>
            <Textarea
              id="save-description"
              placeholder="Adding a description makes your docs better"
              onChange={handleChangeQueryDescription}
              defaultValue={values.description}
            />
          </FormRow>
        </Form>
      </Modal>
    );
  }
}
