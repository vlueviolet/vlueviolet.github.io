import { useState, useEffect, useRef } from 'react';
import { withRouter } from 'next/router';
import axios from 'axios';

const CardDetailPage = ({ query }) => {
  const [cardData, setCardData] = useState(query.data);

  // console.log(router.query.idx);
  // console.log(`https://jsonplaceholder.typicode.com/users/${router.query.idx}`);

  // const getPostDataByJsonAxios = () => {
  //   axios
  //     // .get(`https://jsonplaceholder.typicode.com/users/${router.query.idx}`)
  //     .get(`https://jsonplaceholder.typicode.com/users/${query.idx}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       setCardData(res.data);
  //     })
  //     .catch((error) => console.error(error));
  // };
  useEffect(() => {
    // console.log(router.query.idx);
    console.log(query);
    // getPostDataByJsonAxios();
  }, []);
  return (
    <div>
      <p>{cardData.name}</p>
      <p>{cardData.email}</p>
    </div>
  );
};

CardDetailPage.getInitialProps = async (context) => {
  const { query } = context;
  return { query };
};

export default withRouter(CardDetailPage);
