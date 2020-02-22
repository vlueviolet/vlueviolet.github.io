const React = require('react');
const { useState, useRef } = React;

const WordRelay = () => {
  const [word, setWord] = useState('산기슭');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (word[word.length - 1] === value[0]) {
      setResult('딩동댕');
      setWord(value);
      setValue('');
      inputRef.current.focus();
    } else {
      setResult('땡');
      setValue('');
      inputRef.current.focus();
    }
  };

  const onChangeInput = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  }

  return (
    <>
      <div>{word}</div>
      <form onSubmit={onSubmitForm}>
        <label htmlFor="txt-word">입력값: </label>
        <input type="text" id="txt-word" ref={inputRef} value={value} onChange={onChangeInput}/>
        <button type="submit" className="btn">입력</button>
      </form>
      <div>{result}</div>
    </>
  );
}

module.exports = WordRelay;