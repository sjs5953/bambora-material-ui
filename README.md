<h1>Bambora Material UI</h1>
<p>Inspired by the Custom Checkouts on <a href="https://dev.na.bambora.com/docs/guides/custom_checkout/demos/">Bambora's website</a>, this implementation hooks into Material UI and takes care of validation and tokenization. You just need to worry about ordering the form fields and setting their labels and styles (i.e. input variant).</p>

```
import React from 'react';
import Bambora, {
  Submit,
  CreditCardField,
  CvvField,
  ExpiryField,
} from 'bambora-material-ui';

export default () => (
  <Bambora onTokenization={(e) => alert(e.token)}>
    <CreditCardField label="Credit card number" />
    <CvvField label="CVV" />
    <ExpiryField label="Expiry" />
    <Submit />
  </Bambora>
);
```