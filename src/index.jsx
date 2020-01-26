import React from 'react';
import Field from './components/field';
import { CARD, CVV, EXP } from './utils/constants';

export { default } from './components/form';
export { default as Submit } from './components/submit';

/**
 * This is very important!
 * We must wire-up the IDs before exporting.
 */
export const CreditCardField = (props) => (
  <Field id={CARD} {...props} />
);

export const CvvField = (props) => (
  <Field id={CVV} {...props} />
);

export const ExpiryField = (props) => (
  <Field id={EXP} {...props} />
);
