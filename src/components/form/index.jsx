import React from 'react';
import PropTypes from 'prop-types';
import { invoke } from 'lodash';
import { URL } from '../../utils/constants';
import Adapter from '../../utils/adapter';
import useScript from '../../utils/useScript';
import { FetchingStateProvider } from '../fetching';

const withCheckout = (Component) => (props) => {
  const [ready] = useScript(URL);
  const remoteForm = React.useRef();

  React.useEffect(() => {
    if (
      (!ready && !('customcheckout' in window)) ||
      remoteForm.current
    )
      return undefined;

    const inst = window.customcheckout();
    Adapter(inst);
    remoteForm.current = inst;

    return () => invoke(remoteForm, 'current.clearAll');
  }, [ready]);

  const handleCheckout = React.useCallback(
    (pre, post) => (e) => {
      e.preventDefault();

      pre();
      remoteForm.current.createToken((r) =>
        post(r).then(() =>
          invoke(remoteForm, 'current.clearAll'),
        ),
      );
    },
    [remoteForm],
  );

  return <Component {...props} onSubmit={handleCheckout} />;
};

const Form = ({ onTokenization, onSubmit, children }) => {
  const [fetching, setFetching] = React.useState(false);

  return (
    <form
      onSubmit={onSubmit(
        () => setFetching(true),
        (res) =>
          onTokenization(res).then(() =>
            setFetching(false),
          ),
      )}
    >
      <FetchingStateProvider fetching={fetching}>
        {children}
      </FetchingStateProvider>
    </form>
  );
};

Form.propTypes = {
  /**
   * Callback for post-adapter submission.
   */
  onTokenization: PropTypes.func.isRequired,

  /**
   * Callback to generate token.
   */
  onSubmit: PropTypes.func.isRequired,

  /**
   * Ideally, an area of Fields. The adapter assumes so.
   */
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.node,
    PropTypes.object,
  ]).isRequired,
};

export default withCheckout(Form);
