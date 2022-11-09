import type { Subscription } from "hyperapp";

type LocalStorageLoaderProps = {
  key: string;
  action: CallableFunction;
};

function _stateLoader(dispatch, props: LocalStorageLoaderProps) {
  let data = localStorage.getItem(props.key);
  if (!data) return;
  data = JSON.parse(data);
  dispatch(props.action, data);
}

export function LocalStorageLoader<S>(
  key,
  action: CallableFunction
): Subscription<S, LocalStorageLoaderProps> {
  return [_stateLoader, { key, action }];
}

type LocalStorageSaverProps = {
  key: string;
  value: any;
};

function _stateSaver(dispatch, props: LocalStorageSaverProps) {
  requestAnimationFrame((_) =>
    localStorage.setItem(props.key, JSON.stringify(props.value))
  );
  return () => {};
}

export function LocalStorageSaver<S>(
  key: string,
  value: any
): Subscription<S, LocalStorageSaverProps> {
  return [_stateSaver, { key, value }];
}
