import { configure } from '@storybook/vue'

function loadStories() {
  // You can require as many stories as you need.
  const load = req => req.keys().map(req)

  load(require.context('../src/stories', true, /\.story\.js$/))
}

configure(loadStories, module);