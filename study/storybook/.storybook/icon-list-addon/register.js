//.storybook/icon-list-addon/register.js
import React, { Fragment, useState, useEffect } from 'react';
import { AddonPanel } from '@storybook/components';
import { addons, types } from '@storybook/addons';
import classnames from 'classnames';
import { TabsState } from '@storybook/components';
import { styled } from '@storybook/theming';

const initialStyle = `
  margin: 0;
  padding: 0;
`;

const buttonInitial = `
  overflow: visible;
  border: none;
  border-radius: 0;
  background: none;
  cursor: pointer;
  -webkit-user-select: none;
`;

const inputInitial = `
  -webkit-border-radius: 0;
  border-radius: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 0;
  background: transparent;
  &::-ms-reveal {
    display: none;
  }
  &::-ms-clear,
  &::-ms-reveal{
    display:none;width:0;height:0;
  }
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration{
    display:none;
  }
`;

const SearchBox = styled.div`
  padding: 10px;
  text-align: right;
  label {
    display: inline-block;
    vertical-align: top;
  }
  input {
    ${inputInitial}
    height: 30px;
    padding: 0 5px;
    border: 1px solid #eee;
    border-radius: 3px;
    font-size: 13px;
    line-height: 30px;
  }
  button {
    ${buttonInitial}
    min-width: 60px;
    height: 30px;
    margin-left: 5px;
    border-radius: 3px;
    background-color: #2a2a2a;
    padding: 0 10px;
    font-size: 13px;
    font-weight: bold;
    color: #fff;
    vertical-align: top;
    box-sizing: border-box;
    transition: background-color 0.1s ease-out;
    &:disabled {
      background-color: #ddd;
      cursor: default;
      point-events: none;
    }
  }
`;

const List = styled.ul`
  ${initialStyle}
  list-style: none;
`;

const ListItem = styled.li`
  display: inline-block;
  width: 20%;

  .list_inner {
    overflow: hidden;
    margin: 10px;
    border: 1px solid #eee;
    border-radius: 5px;
  }
`;

const ListName = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 10px;
  color: #2a2a2a;
  text-align: center;

  &:hover {
    .copy {
      visibility: visible;
    }
  }

  .list_name {
    &_inner {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &_em {
      margin-left: 3px;
      color: orange;
    }
  }

  .list_path {
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    font-size: 12px;
    color: rgba(51, 51, 51, 0.3);
    text-align: center;
    box-sizing: border-box;

    &_inner {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .copy {
    ${buttonInitial}
    visibility: hidden;
    display: flex;
    overflow: visible;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #2a2a2a;
    font-size: 13px;
    color: #fff;
  }
`;

const ListViewer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100px;
  padding: 10px;
  background-color: #eee;
  text-align: center;
  box-sizing: border-box;

  &:hover {
    .list_viewer_text {
      visibility: visible;
    }
  }

  &.dark {
    background-color: #2a2a2a;
  }

  .list_viewer_text {
    visibility: hidden;
    position: absolute;
    right: 5px;
    bottom: 5px;
    font-size: 11px;
    color: gray;
  }
`;

const ListFile = styled.div`
  display: inline-block;
  max-width: 50px;
  max-height: 50px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const ListSource = styled.div`
  overflow: auto;
  height: 100px;
  font-size: 12px;
  font-weight: 300;
  color: rgba(51, 51, 51, 0.5);

  .list_source_inner {
    display: block;
    overflow: hidden;
    margin: 10px;
    box-sizing: border-box;
  }
`;

const NoResult = styled.div`
  padding: 50px 0;
  font-size: 15px;
  color: #2a2a2a;
  text-align: center;
  em {
    font-style: normal;
    font-weight: bold;
    color: tomato;
  }
`;

const svgIconsReq = require.context(
  '!!raw-loader!../../src/asset/images',
  true,
  /.\.svg$/
);

const svgIconTokenFiles = svgIconsReq.keys().map((filename, index) => {
  return {
    idx: index,
    filename,
    content: svgIconsReq(filename).default,
    isCopied: false,
    isSelectedViewer: false
  };
});

const AddonIconList = () => {
  const [iconList, setIconList] = useState(svgIconTokenFiles);
  const [clickCopy, setClickCopy] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleCopyFilename = (item) => {
    setClickCopy(true);
    return navigator.clipboard.writeText(item);
  };

  const handleBlurFilename = () => {
    setClickCopy(false);
  };

  const handleClickViewer = (idx) => {
    setIconList(
      iconList.map((item) =>
        item.idx === idx
          ? { ...item, isSelectedViewer: !item.isSelectedViewer }
          : item
      )
    );
  };
  const handleChangeSearch = (e) => {
    const { value } = e.target;
    setInputValue(value);
    if (value) {
      const list = svgIconTokenFiles.filter((item) => {
        const filename = item.filename.split('/')[
          item.filename.split('/').length - 1
        ];
        const array = filename.toLowerCase().includes(value);
        return array;
      });
      setIconList(list);
    } else {
      setIconList(svgIconTokenFiles);
    }
  };

  const handleClickSearch = (e) => {};

  useEffect(() => {}, [iconList]);

  return (
    <>
      <SearchBox>
        <label htmlFor="srch">
          <input
            type="search"
            id="srch"
            placeholder="검색어를 입력하세요"
            value={inputValue}
            onChange={handleChangeSearch}
          />
        </label>
        <button
          type="button"
          onClick={handleClickSearch}
          disabled={!inputValue}
        >
          검색
        </button>
      </SearchBox>
      <List>
        {iconList.length > 0 ? (
          iconList.map((item, index) => {
            const filename = item.filename.split('/')[
              item.filename.split('/').length - 1
            ];
            return (
              <ListItem key={index}>
                <div className="list_inner">
                  <ListName>
                    <span className="list_name_inner">{filename}</span>
                    <div className="list_path">
                      <span className="list_path_inner">{item.filename}</span>
                    </div>
                    <button
                      type="button"
                      className="copy"
                      onClick={() => handleCopyFilename(filename)}
                      onBlur={handleBlurFilename}
                    >
                      {!clickCopy && (
                        <>
                          Click to Copy{' '}
                          <em className="list_name_em">Filename</em>
                        </>
                      )}
                      {clickCopy && <>Copied!</>}
                    </button>
                  </ListName>
                  <ListViewer
                    className={classnames(
                      'list_viewer',
                      item.isSelectedViewer && 'dark'
                    )}
                    onClick={() => handleClickViewer(index)}
                  >
                    <ListFile
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                    {!item.isSelectedViewer && (
                      <span className="list_viewer_text">
                        Click to view in dark mode
                      </span>
                    )}
                  </ListViewer>
                  <ListSource>
                    <span className="list_source_inner">{item.content}</span>
                  </ListSource>
                </div>
              </ListItem>
            );
          })
        ) : (
          <NoResult>
            <em>'{inputValue}'</em> 에 대한 검색결과가 없습니다.
          </NoResult>
        )}
      </List>
    </>
  );
};

addons.register('dajung/icon-list-addon', () => {
  addons.add('icon-list-addon/panel', {
    title: 'Icon List',
    type: types.PANEL,
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <AddonIconList />
      </AddonPanel>
    )
  });
});
