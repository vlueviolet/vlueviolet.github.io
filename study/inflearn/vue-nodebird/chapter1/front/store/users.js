export const state = () => ({
  hello: 'users'
});

export const mutations = {
  bye(state) {
    state.hello = 'goodbye users';
  }
};
