import '../styles/styles.scss';
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
MyApp.getInitialProps = async (context) => {
  const { ctx, Component } = context;
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};
export default MyApp;
