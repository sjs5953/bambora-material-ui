import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';

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

  return (
    <FormControl fullWidth id={`${id}-container`}>
      <InputLabel
        variant={variant}
        required
        htmlFor={id}
        {...rest}
      >
        {label}
      </InputLabel>
      <El
        required
        inputComponent="div"
        error={Boolean(error)}
        inputProps={{
          style: {
            padding: 0,
            height: 'auto',
            minHeight: 56,
          },
        }}
        label={label}
        name={label}
        id={id}
        {...rest}
      />
      <FormHelperText
        id={`${id}-helper`}
        error
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
