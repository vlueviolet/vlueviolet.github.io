const React = require('react');
const { useState, useRef } = React;

const Gugudan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(
    Math.ceil(Math.random() * 9)
  );
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null);

  const onChangeInput = e => {
    setValue(e.target.value);
  };

  const onSubmitForm = e => {
    e.preventDefault();
    if (parseInt(value) === first * second) {
      setResult(prevResult => {
        console.log('???', prevResult);
        return '정답' + value;
      });
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue('');
      inputRef.current.focus();
      console.log(inputRef);
    } else {
      setResult('땡' + value);
      setValue('');
      inputRef.current.focus();
    }
  };

  return (
    <>
      <span>
        {first} x {second} =
      </span>
      <form onSubmit={onSubmitForm}>
        <input
          type="number"
          value={value}
          ref={inputRef}
          onChange={onChangeInput}
        />
        <button type="submit">입력</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = Gugudan;