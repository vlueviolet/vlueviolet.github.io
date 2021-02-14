import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <title>React Practice</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <body>
          {/* 라우터에 해당하는 페이지가 렌더링 되는 부분 */}
          <Main />
          {/* next 관련된 자바스크립트 파일 */}
          <NextScript />
        </body>
      </html>
    );
  }
}
