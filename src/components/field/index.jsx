import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabelWrapper from '../label';
import useObserver from '../../utils/useObserver';
import { FetchingState } from '../fetching';
import { CARD } from '../../utils/constants';

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
  size,
  ...rest
}) => {
  const El =
    variant === 'filled' ? FilledInput : OutlinedInput;

  const { ref, hasError, inFocus } = useObserver();
  const { fetching } = React.useContext(FetchingState);

  const commonAttrs = {
    error: hasError,
    required: true,
    size,
    label,
    variant,
    ...rest,
  };

  return (
    <Grid item md={id === CARD ? 12 : 6} xs={12}>
      <FormControl
        fullWidth
        id={`${id}-container`}
        size="small"
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
          notched={inFocus}
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
    </Grid>
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
   * Material UI variant name.
   */
  variant: PropTypes.oneOf([
    'standard',
    'filled',
    'outlined',
  ]),

  /**
   * Matierial UI size name.
   */
  size: PropTypes.oneOf(['regular', 'small']),

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
  variant: 'outlined',
  size: 'small',
  error: '',
};

export default TextFieldWrapper;
