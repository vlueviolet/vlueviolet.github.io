module.exports = {
  head() {
    return {
      title: 'NodeBird'
    };
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],
  plugins: [],
  devModules: [
    '@nuxtjs/vuetify',
  ],
  vuetify: {
  },
  styleResources: {
    sass: [
      // '@/assets/styles/common.scss'
    ]
  },
};