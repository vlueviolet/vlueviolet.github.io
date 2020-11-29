import { useEffect, useState } from 'react';
import Card from '../components/card';
import axios from 'axios';

const CardList = () => {
  const [inputVal, setInputVal] = useState({
    name: '',
    job: ''
  });
  const [cardList, setCardList] = useState([]);

  const [selectedCard, setSelectedCard] = useState();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInputVal({
      ...inputVal,
      [name]: value
    });
  };

  const handleClickCard = (idx) => {
    setSelectedCard(idx);
  };

  const handleAddCard = () => {
    if (!inputVal.name) return alert('이름을 입력해주세요.');
    let newObj = {
      name: inputVal.name,
      email: 'example@example.com',
      phone: '1-123-123-123',
      username: 'Bret',
      website: 'example.org'
    };

    axios({
      url: 'https://jsonplaceholder.typicode.com/users',
      method: 'post',
      data: newObj
    })
      .then((res) => {
        console.log(res.data);
        // getPostDataByJson();
        setCardList(cardList.concat(res.data)); // api가 save를 지원 안해줘서 임시 처리
      })
      .catch((error) => console.error(error));
    // setCardList(cardList.concat(newObj));
  };

  const handleUpdateCard = () => {
    if (selectedCard === undefined) return alert('선택된 카드가 없습니다.');
    if (!inputVal.name) return alert('이름을 입력하세요');
    if (!inputVal.job) return alert('직업을 입력하세요');
    setCardList(
      cardList.map((item) =>
        item.idx === selectedCard
          ? { ...item, name: inputVal.name, job: inputVal.job }
          : item
      )
    );
  };

  const handleDeleteCard = () => {
    if (selectedCard === undefined) return alert('선택된 카드가 없습니다.');
    setCardList(cardList.filter((item) => item.idx !== selectedCard));
  };

  // fetch 구문
  const getPostDataByJson = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  // axios
  const getPostDataByJsonAxios = () => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        setCardList(res.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getPostDataByJson();
    getPostDataByJsonAxios();
  }, []);

  useEffect(() => {
    console.log(selectedCard);
  }, [selectedCard]);

  return (
    <section className="card-list-container">
      <div className="card-list-wrapper">
        <div className="card-list-control">
          <input
            type="text"
            className="card-list-control-input"
            value={inputVal.name}
            name="name"
            onChange={handleChangeInput}
            placeholder="이름을 입력하세요"
          />
          {/* <input
            type="text"
            className="card-list-control-input"
            value={inputVal.job}
            name="job"
            onChange={handleChangeInput}
            placeholder="직업을 입력하세요"
          /> */}
          <button
            type="button"
            className="card-list-control-btn"
            onClick={handleAddCard}
          >
            추가
          </button>
          <button
            type="button"
            className="card-list-control-btn"
            onClick={handleUpdateCard}
          >
            수정
          </button>
          <button
            type="button"
            className="card-list-control-btn"
            onClick={handleDeleteCard}
          >
            삭제
          </button>
        </div>
        <ul className="card-list-box">
          {cardList
            // .filter((item) => inputVal && item.name === inputVal)
            .map((item, index) => (
              <Card key={index} data={item} onClickCB={handleClickCard} />
            ))}
        </ul>
      </div>
    </section>
  );
};

export default CardList;
