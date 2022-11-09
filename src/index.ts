import type {
  Dispatch,
  Dispatchable,
  Effect,
  Subscription,
  Unsubscribe,
} from "hyperapp";

type LocalStorageLoaderProps<S> = {
  key: string;
  action: Dispatchable<S>;
};

function _stateLoader<S>(
  dispatch: Dispatch<S>,
  props: LocalStorageLoaderProps<S>
) {
  let data = localStorage.getItem(props.key);
  if (!data) return;
  data = JSON.parse(data);
  dispatch(props.action, data);
}

export function LocalStorageLoader<S>(
  key: string,
  action: Dispatchable<S>
): Effect<S> {
  return [_stateLoader, { key, action }];
}

type LocalStorageSaverProps = {
  key: string;
  value: any;
};

function _stateSaver<S>(
  dispatch: Dispatch<S>,
  props: LocalStorageSaverProps
): Unsubscribe {
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
