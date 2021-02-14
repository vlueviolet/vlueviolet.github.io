// /* eslint-disable */
import React, { ChangeEvent, useState } from 'react';
// import classnames from 'classnames';
import style from './index.module.scss';
// import IconSearch from 'asset/images/svg/icon-search.svg';

export interface InputTextProps {
  /** 버튼 타입 */
  type: string;
  /** 버튼 텍스트 */
  label: string;
  /** 비활성화 */
  disabled: boolean;
  // /** 클릭 함수 */
  // onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  /** 입력값 */
  valueProps: string;
}

const InputText = ({ valueProps = '' }: InputTextProps) => {
  const [inputValue, setInputValue] = useState(valueProps);
  const onChange = (e: any) => {
    const { value } = e.target;
    setInputValue(value);
  };

  return (
    <div className={style.input_text}>
      <label htmlFor="input" className={style.input_text_label}>
        이름 :
      </label>
      <input
        type="text"
        id="input"
        className={style.input_text_elem}
        placeholder="이름을 입력하세요."
        onChange={onChange}
        value={inputValue}
      />
    </div>
  );
};

export default InputText;
