import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { PAY } from '../../utils/constants';
import { FetchingState } from '../fetching';

/**
 * Although the disable prop is enabled here,
 * the Adapter utility actually controls itself value.
 */
const Submit = ({ label, color, variant, size }) => {
  const { fetching } = React.useContext(FetchingState);

  return (
    <Box mt={1}>
      {fetching ? (
        <CircularProgress />
      ) : (
        <Button
          id={PAY}
          disabled
          color={color}
          variant={variant}
          size={size}
          type="submit"
        >
          {label}
        </Button>
      )}
    </Box>
  );
};

Submit.propTypes = {
  /**
   * Form's submit label.
   */
  label: PropTypes.string,

  /**
   * Material UI button color prop
   */
  color: PropTypes.string,

  /**
   * Material UI button variant prop
   */
  variant: PropTypes.string,

  /**
   * Material UI button size prop
   */
  size: PropTypes.string,
};

Submit.defaultProps = {
  label: 'Pay now',
  color: 'primary',
  variant: 'contained',
  size: 'large',
};

export default Submit;
