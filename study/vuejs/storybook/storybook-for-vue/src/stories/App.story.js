import { storiesOf } from '@storybook/vue'

import App from '../App.vue'

storiesOf('App', module)
  .add('main', () => ({
    components: { App },
    template: '<app></app>'
  }))