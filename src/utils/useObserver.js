import React from 'react';
import { invoke } from 'lodash';
import { IN_FOCUS, HAS_ERROR } from './constants';

export default () => {
  const ref = React.useRef();
  const [inFocus, setInFocus] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);

  const callback = React.useCallback(() => {
    setInFocus(
      invoke(ref, 'current.hasAttribute', IN_FOCUS),
    );
    setHasError(
      invoke(ref, 'current.hasAttribute', HAS_ERROR),
    );
  }, []);

  React.useEffect(() => {
    const observer = new MutationObserver(callback);

    observer.observe(ref.current, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    return observer.disconnect;
  }, []);

  return {
    inFocus,
    hasError,
    ref,
  };
};
