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
  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#fff',
      },
      {
        name: 'dark',
        value: 'rgba(0,0,0,0.8)',
      },
      {
        name: 'twitter',
        value: '#00aced',
      },
      {
        name: 'facebook',
        value: '#3b5998',
      },
    ],
  },
};
// .storybook/preview.js

// export const globalTypes = {
//   theme: {
//     name: 'Theme',
//     description: 'Global theme for components',
//     defaultValue: 'light',
//     toolbar: [
//       {
//         icon: 'circlehollow',
//         // array of plain string values or MenuItem shape (see below)
//         items: ['light', 'dark'],
//       },
//     ],
//   },
// };

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      // array of plain string values or MenuItem shape (see below)
      items: ['light', 'dark'],
    },
  },
  locale: {
    name: 'Locale',
    description: 'locale',
    defaultValue: 'kr',
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'en', right: '🇺🇸', title: 'English' },
        { value: 'fr', right: '🇫🇷', title: 'Français' },
        { value: 'zh', right: '🇨🇳', title: '中文' },
        { value: 'kr', right: '🇰🇷', title: '한국어' },
      ],
    },
  },
};
