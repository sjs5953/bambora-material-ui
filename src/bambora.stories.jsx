/* eslint-disable no-alert */
import React from 'react';
import Bambora, {
  Submit,
  CreditCardField,
  CvvField,
  ExpiryField,
} from '.';

export default {
  title: 'Bambora',
  parameters: {
    component: Bambora,
    componentSubtitle:
      'Material UI implementation for credit card tokenization',
  },
};

export const Demo = () => (
  <Bambora
    onTokenization={() =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      })
    }
  >
    <CreditCardField label="Credit card number" />
    <CvvField label="CVV" />
    <ExpiryField label="Expiry" />
    <Submit />
  </Bambora>
);
