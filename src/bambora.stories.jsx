import React from 'react';
import Bambora from '.';

export default {
  title: 'Bambora',
  parameters: {
    component: Bambora,
    componentSubtitle:
      'Material UI implementation for credit card tokenization',
  },
};

export const Demo = () => <Bambora done={console.log} />;
