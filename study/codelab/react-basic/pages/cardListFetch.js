import { useEffect, useState, useRef, useCallback } from 'react';
import Router from 'next/router';
import Card from '../components/card';
import axios from 'axios';

const CardList = () => {
  const [inputVal, setInputVal] = useState({
    name: '',
    job: ''
  });
  const [cardList, setCardList] = useState([]);

  const [selectedCard, setSelectedCard] = useState();

  const [imgFile, setImgFile] = useState();

  const fileInputFileRef = useRef(null);
  const imgPreviewRef = useRef(null);

  const handleChangeInput = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInputVal({
        ...inputVal,
        [name]: value
      });
    },
    [setInputVal]
  );

  // const handleClickCard = (idx) => {
  //   setSelectedCard(idx);
  //   // Router.push(`/cardDetail?idx=${idx}`).then(() => window.scrollTo(0, 0));
  //   Router.push(`/detail/${idx}`);
  //   // Router.push(`/detail/${idx}`).then(() => window.scrollTo(0, 0));
  //   // Router.push((pathname: '/cardDetail/[idx]'), (query: { idx: 1 }));
  // };

  const handleClickCard = useCallback(
    (idx) => {
      // Router.push(`/cardDetail?idx=${idx}`).then(() => window.scrollTo(0, 0));
      setSelectedCard(idx);
      Router.push(`/detail/${idx}`);
      // Router.push(`/detail/${idx}`).then(() => window.scrollTo(0, 0));
      // Router.push((pathname: '/cardDetail/[idx]'), (query: { idx: 1 }));
    },
    [selectedCard]
  );

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
      // url: 'https://jsonplaceholder.typicode.com/users',
      url: '/cardList/users',
      method: 'post',
      data: newObj
    })
      .then((res) => {
        // getPostDataByJson();
        console.log(res.data);
        setCardList(cardList.concat(res.data)); // api가 save를 지원 안해줘서 임시 처리
      })
      .catch((error) => console.error(error));
    // setCardList(cardList.concat(newObj));
  };

  const handleUpdateCard = () => {
    if (selectedCard === undefined) return alert('선택된 카드가 없습니다.');
    if (!inputVal.name) return alert('이름을 입력하세요');
    // if (!inputVal.job) return alert('직업을 입력하세요');
    setCardList(
      cardList.map((item) =>
        item.id === selectedCard ? { ...item, name: inputVal.name } : item
      )
    );
  };

  const handleDeleteCard = () => {
    if (selectedCard === undefined) return alert('선택된 카드가 없습니다.');
    axios({
      url: `https://jsonplaceholder.typicode.com/users/${selectedCard}`,
      method: 'delete'
    })
      .then((res) => {
        setCardList(cardList.filter((item) => item.id !== selectedCard));
      })
      .catch((error) => console.error(error.response));
  };

  const handleAddImg = () => {
    fileInputFileRef.current.click();
  };

  const handleChangeFile = (e) => {
    const { files } = e.target;
    console.log(files);
    setImgFile(files[0]);
  };

  // fetch 구문
  const getPostDataByJson = () => {
    fetch('https://jsonplaceholder.typicode.com/users').then((response) =>
      response.json()
    );
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

  useEffect(() => {}, [selectedCard]);

  useEffect(() => {
    if (imgFile) {
      const preview = imgPreviewRef.current;
      var reader = new FileReader(); // old한 방식이라고 함, uri 어쩌구 방식이 있데
      reader.onload = function (e) {
        preview.src = e.target.result;
      };
      reader.readAsDataURL(imgFile);
    }
  }, [imgFile]);

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
          <div className="card-list-control-viewer">
            <button
              type="button"
              className="card-list-control-btn"
              onClick={handleAddImg}
            >
              이미지 추가
            </button>
            <input
              className="blind"
              type="file"
              ref={fileInputFileRef}
              onChange={handleChangeFile}
            />
          </div>
        </div>
        {imgFile && (
          <div className="card-list-preview-image">
            <img ref={imgPreviewRef} src={imgFile} />
          </div>
        )}
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
