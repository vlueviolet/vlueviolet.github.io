import React, { useState } from 'react';
import classnames from 'classnames';
import style from './index.module.scss';

export interface SearchProps {
  /** 검색어 */
  searchText?: string;
  /** 검색 결과 */
  results?: [];
}

const List = ({ results }: { results: any }) => {
  return results.map((item: string, index: number) => (
    <li className={style.search_result_item} key={`search-result-${index}`}>
      <a href="#" className={style.search_result_link}>
        {item}
      </a>
    </li>
  ));
};

const Search = ({ searchText, results }: SearchProps) => {
  const [inputText, setInputText] = useState(searchText);

  const handleChangeSearch = ({
    target
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(target.value);
  };

  return (
    <div className={style.search}>
      <div className={style.search_input}>
        <i className={style.search_input_icon}>🔎</i>
        <label
          htmlFor="srch"
          className={style.search_input_label}
          aria-label="검색어 입력"
        >
          <input
            type="text"
            id="srch"
            className={style.search_input_text}
            placeholder="검색어를 입력하세요"
            value={inputText}
            onChange={handleChangeSearch}
          />
        </label>
      </div>
      <div className={style.search_result}>
        {results ? (
          <div className={style.search_result_box}>
            <p className={style.search_result_text}>
              <em className={style.search_result_text_em}>{results.length}</em>
              개의 검색 결과가 있습니다.
            </p>
            <ul className={style.search_result_list}>
              <List results={results} />
            </ul>
          </div>
        ) : (
          <p className={style.search_result_no}>
            <em className={style.search_result_no_em}>{inputText}</em>에 대한
            검색 결과가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
};

export default Search;
