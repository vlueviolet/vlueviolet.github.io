export const state = () => ({
  hello: 'posts'
});

export const mutations = {
  bye(state) {
    state.hello = 'goodbye posts';
  }
};
