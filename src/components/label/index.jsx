import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import useObserver from '../../utils/useObserver';

const InputLabelWrapper = ({ children, ...rest }) => {
  const { inFocus, ref } = useObserver();

  return (
    <InputLabel {...rest} shrink={inFocus} ref={ref}>
      {children}
    </InputLabel>
  );
};

InputLabelWrapper.propTypes = {
  /**
   * Populates the visible field label element.
   */
  children: PropTypes.string.isRequired,
};

export default InputLabelWrapper;
