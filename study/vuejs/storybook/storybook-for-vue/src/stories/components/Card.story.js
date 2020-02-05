import { storiesOf } from '@storybook/vue'
// import VueInfoAddon from 'storybook-addon-vue-info'
import { withInfo } from 'storybook-addon-vue-info'


import Card from '../../components/Card.vue'

storiesOf('Card', module)
  .addDecorator(withInfo)
  .add('only title', () => ({
    components: { Card },
    template: '<card title="Card Title"></card>'
  }))
  .add('with message', () => ({
    components: { Card },
    template: '<card title="Card Title" message="With Message"></card>'
  }))