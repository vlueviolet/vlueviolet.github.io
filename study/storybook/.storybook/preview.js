import React from 'react';
import { addParameters } from '@storybook/react';

// import '../src/asset/scss/global.scss';

addParameters({
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
    showPanel: true,
    panelPosition: 'bottom',
  },
  docs: { page: null },
});

export const parameters = {
  a11y: {
    element: '#root',
    config: {},
    options: {},
    manual: true,
  },
  controls: {
    expanded: true,
  },
};
