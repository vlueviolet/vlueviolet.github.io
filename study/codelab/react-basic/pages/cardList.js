import { useEffect, useState } from 'react';
import Card from '../components/card';

const CardList = () => {
  const [inputVal, setInputVal] = useState({
    name: '',
    job: ''
  });
  const [cardList, setCardList] = useState([
    { idx: 1, name: '홍길동', job: '의적' },
    { idx: 2, name: '김철수', job: '선생님' },
    { idx: 3, name: '박영희', job: '의사' },
    { idx: 4, name: '베트맨', job: '히어로' }
  ]);

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
    let newObj = {
      idx: cardList.length + 1,
      name: inputVal.name,
      job: inputVal.job
    };
    setCardList(cardList.concat(newObj));
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
          <input
            type="text"
            className="card-list-control-input"
            value={inputVal.job}
            name="job"
            onChange={handleChangeInput}
            placeholder="직업을 입력하세요"
          />
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
        <div className="card-list-box">
          {cardList
            // .filter((item) => inputVal && item.name === inputVal)
            .map((item, index) => (
              <Card key={index} data={item} onClickCB={handleClickCard} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default CardList;
