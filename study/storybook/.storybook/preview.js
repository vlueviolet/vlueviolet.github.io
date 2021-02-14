import React from 'react';
import { addParameters } from '@storybook/react';
import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

const svgIconsReq = require.context(
  '!!raw-loader!../src/asset/images',
  true,
  /.\.svg$/
);

const svgIconTokenFiles = svgIconsReq.keys().map((filename, index) => {
  return {
    filename,
    content: svgIconsReq(filename).default
  };
});

// export const SvgIconSample = svgIconTokenFiles[0].content;

addParameters({
  options: {
    storySort: (a, b) =>
      a[1].kind === b[1].kind
        ? 0
        : a[1].id.localeCompare(b[1].id, undefined, { numeric: true }),
    showPanel: true,
    panelPosition: 'bottom'
  },
  docs: { page: null },
  designToken: {
    files: { svgIcons: svgIconTokenFiles },
    options: {
      hideMatchingHardCodedValues: false
    }
  }
});

const customViewports = {
  iPhone11Pro: {
    name: 'iPhoneX',
    styles: {
      width: '375px',
      height: '812px'
    }
  },
  kindleFire2: {
    name: 'Kindle Fire 2',
    styles: {
      width: '600px',
      height: '963px'
    }
  },
  kindleFireHD: {
    name: 'Kindle Fire HD',
    styles: {
      width: '533px',
      height: '801px'
    }
  }
};

export const parameters = {
  a11y: {
    element: '#root',
    config: {},
    options: {},
    manual: true
  },
  controls: {
    expanded: true
  },
  viewport: { viewports: customViewports },

  backgrounds: {
    default: 'light',
    values: [
      {
        name: 'light',
        value: '#fff'
      },
      {
        name: 'dark',
        value: 'rgba(0,0,0,0.8)'
      },
      {
        name: 'twitter',
        value: '#00aced'
      },
      {
        name: 'facebook',
        value: '#3b5998'
      }
    ]
  },
  actions: {
    argTypesRegex: '^on.*'
  }
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
      items: ['light', 'dark']
    }
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
        { value: 'kr', right: '🇰🇷', title: '한국어' }
      ]
    }
  }
};
