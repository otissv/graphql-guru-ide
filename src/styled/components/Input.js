import React, { PureComponent } from 'react';
import InputStyled from '../Input-styled';
import { input as theme } from '../theme';

function maybeModifier (initial) {
  return value => Boolean(initial && initial === value);
}

export default class Input extends PureComponent {
  render () {
    const isContext = maybeModifier(this.props.context);
    const isSize = maybeModifier(this.props.size);
    const isWidth = maybeModifier(this.props.widths);
    let size = {};
    let mWidth = {};
    let context = {};

    // context
    if (isContext('danger')) {
      size = theme.context.danger;
    }

    if (isContext('success')) {
      size = theme.context.success;
    }

    // size
    if (isSize('large')) {
      size = theme.size.large;
    }

    if (isSize('small')) {
      size = theme.size.small;
    }

    // mWidth
    if (isWidth('large')) {
      mWidth.width = theme.mWidth.large;
    }

    if (isWidth('medium')) {
      mWidth.width = theme.mWidth.medium;
    }

    if (isWidth('small')) {
      mWidth.width = theme.mWidth.small;
    }

    if (isWidth('xsmall')) {
      mWidth.width = theme.mWidth.xsmall;
    }
    return <InputStyled {...this.props} {...size} {...mWidth} {...context} />;
  }
}
