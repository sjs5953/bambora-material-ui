import React from 'react';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabelWrapper from '../label';
import useObserver from '../../utils/useObserver';
import { FetchingState } from '../fetching';

/**
 * Note that Material UI needs some styling normalization here.
 * As well, some of the hard-coded props (i.e. style) are dynamically
 * altered by the Adapter utility.
 */
const TextFieldWrapper = ({
  id,
  label,
  variant,
  error,
  ...rest
}) => {
  const El =
    variant === 'filled' ? FilledInput : OutlinedInput;

  const { ref, hasError } = useObserver();
  const { fetching } = React.useContext(FetchingState);

  const commonAttrs = {
    error: hasError,
    required: true,
    label,
    variant,
    ...rest,
  };

  return (
    <FormControl
      fullWidth
      id={`${id}-container`}
      style={{ marginBottom: 8 }}
    >
      <InputLabelWrapper htmlFor={id} {...commonAttrs}>
        {label}
      </InputLabelWrapper>
      <El
        id={id}
        inputRef={ref}
        inputComponent="div"
        disabled={fetching}
        readOnly={fetching}
        name={label}
        inputProps={{
          style: {
            padding: 0,
            height: 'auto',
            minHeight: 56,
          },
        }}
        {...commonAttrs}
      />
      <FormHelperText
        error
        id={`${id}-helper`}
        style={{ display: 'none' }}
      >
        {error}
      </FormHelperText>
    </FormControl>
  );
};

TextFieldWrapper.propTypes = {
  /**
   * Unique ID so that Bambora can populate the element with a real text input.
   */
  id: PropTypes.string.isRequired,

  /**
   * Populates the visible field label element.
   */
  label: PropTypes.string.isRequired,

  /**
   * Material UI variant name ("filled" or "outlined")
   */
  variant: PropTypes.string,

  /**
   * Error message to display as field helper text.
   */
  error: PropTypes.string,

  /**
   * Material UI margin name
   */
  margin: PropTypes.string,
};

TextFieldWrapper.defaultProps = {
  margin: undefined,
  variant: 'filled',
  error: '',
};

export default TextFieldWrapper;
