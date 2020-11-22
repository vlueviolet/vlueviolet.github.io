const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev }); // next안에서 가져옴
const handle = app.getRequestHandler(); // next에서 불러옴

app.prepare().then(() => {
  const server = express(); // next 안에서 express를 불러옴

  server.use(morgan('dev'));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser('!ASD!@ASd!AVZXC!@!@#'));
  server.use(
    expressSession({
      resave: false,
      saveUninitialized: false,
      secret: '!ASD!@ASd!AVZXC!@!@#',
      cookie: {
        httpOnly: true,
        secure: false
      }
    })
  );

  // server.get('product/:id/:name/:price', (req, res) => {
  //   const actualPage = 'product_detail';
  //   const queryParams = {
  //     id: req.params.id,
  //     name: req.params.name,
  //     price: req.params.price
  //   };
  //   return app.render(req, res, actualPage, queryParams);
  // });

  // next에서 구성한 page 단위 구성을 하기 위한 코드
  server.get('*', (req, res) => {
    return handle(req, res); // next의 handler 기준으로 맞춤
  });

  server.listen(3000, () => {
    console.log('next + express running on port 3000');
  });
});
