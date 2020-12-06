const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const axios = require('axios');

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

  /**
   * 주소는 페이지명과 동일했어야 했다.
   * next에 의존하지 않고, 시맨틱한 구조를 쓰거나 서버의 이니셜한 prop을 전달할때 쓴다.
   */
  // detail/ 페이지로 이동하는 것 같지만, 실제로는 cardDetail 페이지로 이동한다. next router의 규칙을 깨서 router 제어권을 가져온 코드
  // 이 코드는 next 코드보다 위에 있어야 한다.
  server.post('/cardList/users', async (req, res) => {
    console.log(req.body);
    axios({
      url: 'https://jsonplaceholder.typicode.com/users/',
      method: 'post',
      data: req.body
    }).then((resonse) => {
      console.log(resonse.data);
      res.json(resonse.data);
      // return res.data;
      // console.log(res.data);
    });
  });

  server.get('/detail/:idx', async (req, res) => {
    const actualPage = '/cardDetail'; // 실제로 페이지

    let result = await axios
      // .get(`https://jsonplaceholder.typicode.com/users/${router.query.idx}`)
      .get(`https://jsonplaceholder.typicode.com/users/${req.params.idx}`)
      .then((res) => {
        return res.data;
        // console.log(res.data);
      })
      .catch((error) => console.error(error));
    console.log(result);
    const queryParams = {
      data: result
      // idx: req.params.idx
    };
    return app.render(req, res, actualPage, queryParams);
  });

  // next에서 구성한 page 단위 구성을 하기 위한 코드
  server.get('*', (req, res) => {
    return handle(req, res); // next의 handler 기준으로 맞춤
  });

  server.listen(3000, () => {
    console.log('next + express running on port 3000');
  });
});
