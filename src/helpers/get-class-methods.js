export default function getClassMethods (that) {
  const props = {
    ...that.props,
    ...that
  };

  delete props._reactInternalInstance;
  delete props.constructor;
  delete props.context;
  delete props.props;
  delete props.refs;
  delete props.state;
  delete props.updater;

  return props;
}
