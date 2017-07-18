import React, { PureComponent } from 'react';
import autobind from 'class-autobind';
import { connect } from '../../../store';
import Form from '../../../styled/Form-styled';

const recursivelyMapCloneChildren = (children, callback) => {
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child;
    }

    if (child.props.children) {
      child = React.cloneElement(child, {
        children: recursivelyMapCloneChildren(child.props.children, callback)
      });
    }

    return callback(child);
  });
};

// const getInitialFieldValues = (children, pervious = {}) => {
//   return React.Children.toArray(children).reduce((previousObj, child) => {
//     const maybeProp = key => Boolean(child.props) && child.props[key];

//     if (maybeProp('name') && child.props.initialValue) {
//       // console.log(child.props);
//       return {
//         ...previousObj,
//         [child.props.name]: { value: child.props.initialValue }
//       };
//     }

//     if (child.props && child.props.children) {
//       return getInitialFieldValues(child.props.children, previousObj);
//     }

//     return previousObj;
//   }, pervious);
// };

class ReduxForm extends PureComponent {
  constructor (props) {
    super(...arguments);
    autobind(this);
  }

  getInitialFieldValues (children, pervious = {}) {
    return React.Children.toArray(children).reduce((previousObj, child) => {
      const maybeProp = key => Boolean(child.props) && child.props[key];

      if (maybeProp('value')) {
        return {
          ...previousObj,
          [child.props.name]: child.props.value
        };
      }

      if (child.props && child.props.children) {
        return this.getInitialFieldValues(child.props.children, previousObj);
      }

      return previousObj;
    }, pervious);
  }

  handleSubmit (event) {
    event.preventDefault();
    const { formHasErrors, forms, name, validation, resetForm } = this.props;

    const fields = forms[name].fields;

    const values =
      (fields &&
        Object.keys(fields).reduce(
          (previous, key) => ({ ...previous, [key]: fields[key].value }),
          {}
        )) ||
      {};

    const errors = validation && validation(values);

    if (errors) {
      formHasErrors({ formName: name, forms, errors });
    } else {
      resetForm(name);
      this.props.onSubmit(values);
    }
  }

  onBlur () {}

  onChange (event) {
    const { checked, name, value } = event.target || event;

    this.props.onFormFieldChange({
      forms: this.props.forms,
      formName: this.props.name,
      field: name,
      value: checked || value
    });
  }

  onFocus () {}

  renderChildren () {
    return recursivelyMapCloneChildren(this.props.children, child => {
      return child.props && child.props.name
        ? React.cloneElement(child, {
          onBlur: child.props.onBlur || this.onBlur,
          onChange: child.props.onChange || this.onChange,
          onFocus: child.props.onFocus || this.onFocus
        })
        : child;
    });
  }

  render () {
    const { name } = this.props;

    return (
      <Form name={name} onSubmit={this.handleSubmit}>
        {this.renderChildren()}
      </Form>
    );
  }
}

export default connect(ReduxForm);
