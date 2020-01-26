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
  <Bambora onTokenization={console.log}>
    <CreditCardField label="Credit card number" />
    <CvvField label="CVV" />
    <ExpiryField label="Expiry" />
    <Submit />
  </Bambora>
);
