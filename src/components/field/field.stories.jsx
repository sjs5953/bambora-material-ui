import React from 'react';
import Field from '.';

export default {
  title: 'Bambora/Text Field',
  parameters: {
    component: Field,
    componentSubtitle:
      'Placeholder input where Bambora injects HTML',
  },
};

export const WithLabel = () => (
  <Field id="foo" label="Foo" />
);

export const WithLabelError = () => (
  <Field
    id="foo"
    label="Foo"
    error="Foo is a required field"
  />
);

export const WithOutlinedVariant = () => (
  <Field id="foo" label="Foo" variant="outlined" />
);
