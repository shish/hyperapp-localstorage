function _stateLoader(dispatch, props) {
  let data = localStorage.getItem(props.key);
  if (!data) return;
  data = JSON.parse(data);
  dispatch(props.action, data);
}

export const LocalStorageLoader = (key, action) => [
  _stateLoader,
  { key, action }
];

function _stateSaver(dispatch, props) {
  requestAnimationFrame(_ =>
    localStorage.setItem(props.key, JSON.stringify(props.value))
  );
  return () => {};
}

export const LocalStorageSaver = (key, value) => [_stateSaver, { key, value }];
