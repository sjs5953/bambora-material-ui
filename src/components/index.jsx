import React from 'react';
import PropTypes from 'prop-types';
import Field from './field';
import Form from './form';
import { CARD, CVV, EXP } from '../utils/constants';

const Bambora = ({ done, labels, fieldProps }) => (
  <Form onTokenization={done}>
    <Field
      label={labels.number}
      id={CARD}
      {...fieldProps}
    />
    <Field label={labels.cvv} id={CVV} {...fieldProps} />
    <Field label={labels.expiry} id={EXP} {...fieldProps} />
  </Form>
);

Bambora.propTypes = {
  /**
   * Callback function post-tokenization
   */
  done: PropTypes.func.isRequired,

  /**
   * Override default field labels.
   */
  labels: PropTypes.shape({
    number: PropTypes.string,
    cvv: PropTypes.string,
    expiry: PropTypes.string,
  }),

  /**
   * Override field props.
   */
  fieldProps: PropTypes.shape({
    margin: PropTypes.string,
    variant: PropTypes.string,
  }),
};

Bambora.defaultProps = {
  fieldProps: {},
  labels: {
    number: 'Credit Card Number',
    cvv: 'CVV',
    expiry: 'Expiry Date',
  },
};

export default Bambora;
