export const register = 'forms';

export const initialState = {
  forms: {
    saveForm: {
      fields: {
        name: { value: '' },
        collection: { value: '' },
        description: { value: '' }
      }
    },
    settingsForm: {
      fields: {
        clearPersistedCollection: { value: false },
        clearPersistedHistory: { value: false },
        clearRequestCollection: { value: false },
        clearRequestHistory: { value: false }
      }
    }
  }
};

export class setForms {
  action (payload) {
    return { type: 'FormReducer', payload };
  }
}

export class SetSaveFormFields {
  action (payload) {
    return { type: 'SetSaveFormFields', payload };
  }

  reducer (state, action) {
    return {
      ...state,
      forms: { 
        ...state.forms,
        saveForm: {
          ...state.forms.saveForm,
          fields: {
            ...state.forms.saveForm.fields,
            ...action.payload
          }
        }
      }
    };
  }
}

export class FormReducer {
  reducer (state, action) {
    return {
      ...state,
      forms: { ...state.forms, ...action.payload }
    };
  }
}

export class ClearFormErrors {
  action (data) {
    const { formName, forms, errors } = data;
    const oldForm = forms[formName];
    const oldFields = forms[formName].fields;

    const fieldErrors = Object.keys(errors).reduce((previousObj, key) => {
      return {
        ...previousObj,
        [key]: {
          ...oldFields[key],
          error: null
        }
      };
    });

    const payload = {
      [formName]: {
        ...oldForm,
        error: null,
        fields: {
          ...oldFields,
          ...fieldErrors
        }
      }
    };
    return { type: 'FormReducer', payload };
  }
}

export class FormHasErrors {
  action (data) {
    const { formName, forms, errors } = data;
    const oldForm = forms[formName];
    const oldFields = forms[formName].fields;

    const fieldErrors = Object.keys(errors).reduce((previousObj, key) => {
      return {
        ...previousObj,
        [key]: {
          ...oldFields[key],
          error: errors[key]
        }
      };
    }, {});

    const payload = {
      [formName]: {
        ...oldForm,
        error: true,
        fields: {
          ...oldFields,
          ...fieldErrors
        }
      }
    };

    return { type: 'FormReducer', payload };
  }
}

export class ResetForm {
  action (formName) {
    const payload = {
      [formName]: initialState.forms[formName]
    };

    return { type: 'FormReducer', payload };
  }
}

export class OnFormFieldBlur {
  action (data) {
    return { type: 'FormReducer', data };
  }
}

export class OnFormFieldChange {
  action (data) {
    const { formName, forms, field } = data;
    let value;

    value =
      data.value === 'on' ? false : data.value === true ? true : data.value;

    const oldForm = forms[formName];
    const oldFields = forms[formName].fields;
    const dirty = oldFields[field] !== value;

    const payload = {
      [formName]: {
        ...oldForm,
        errors: null,
        dirty,
        fields: {
          ...oldFields,
          [field]: {
            ...oldFields[field],
            error: null,
            touched: true,
            dirty,
            value
          }
        }
      }
    };

    return { type: 'FormReducer', payload };
  }
}
