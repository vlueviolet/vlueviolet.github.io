import React, { Fragment, useState, useEffect, useRef } from 'react';
import { AddonPanel } from '@storybook/components';
import { addons, types } from '@storybook/addons';
import classnames from 'classnames';
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

const Wrapper = styled.section`
  min-width: 500px;
`;

const SearchBox = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
  padding: 10px;
  background-color: #fff;
  .svg-viewer-search-inner {
    display: inline-flex;
    align-items: center;
    position: relative;
    padding-left: 5px;
    border: 1px solid #eee;
    border-radius: 3px;
  }
  label {
    display: inline-block;
    vertical-align: top;
  }
  input {
    ${inputInitial}
    height: 30px;
    padding: 0 25px 0 5px;
    font-size: 13px;
    line-height: 30px;
    outline: none;
  }
  button {
    ${buttonInitial}
  }
  .svg-viewer-srch-delete {
    position: absolute;
    top: 50%;
    right: 5px;
    width: 20px;
    height: 20px;
    padding: 0;
    border-radius: 50%;
    transform: translateY(-50%);
    &:before,
    &:after {
      position: absolute;
      top: 50%;
      left: 50%;
      height: 12px;
      margin-top: -6px;
      border-left: 1px solid #2a2a2a;
      content: '';
    }
    &:before {
      transform: rotate(-45deg);
    }
    &:after {
      transform: rotate(45deg);
    }
  }
  .btn-search {
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
      pointer-events: none;
    }
  }
`;

const List = styled.ul`
  ${initialStyle}
  list-style: none;
`;

const ListItem = styled.li`
  display: inline-block;
  width: 25%;

  .svg-viewer-item-inner {
    overflow: hidden;
    margin: 10px;
    border: 1px solid #eee;
    border-radius: 5px;
  }
`;

const ListName = styled.div`
  padding: 10px;
  color: #2a2a2a;
  text-align: center;

  &:hover {
    .svg-viewer-item-copy {
      visibility: visible;
    }
  }

  .svg-viewer-item-name {
    display: inline-block;
    overflow: hidden;
    position: relative;
    max-width: 100%;
    em {
      display: block;
      overflow: hidden;
      position: relative;
      font-style: normal;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      &:hover {
        &:after {
          width: 100%;
        }
      }
      &:active {
        background: tomato;
        color: #fff;
      }
      &:after {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 1px;
        background-color: tomato;
        transition: all 0.3s ease-out;
        content: '';
      }
    }
  }

  .svg-viewer-item-path {
    display: flex;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    margin-top: 5px;
    font-size: 12px;
    color: rgba(51, 51, 51, 0.3);
    text-align: center;
    box-sizing: border-box;

    &-inner {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      span {
        display: inline-block;
        overflow: hidden;
        position: relative;
        max-width: 100%;
        font-style: normal;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        &:hover {
          &:after {
            width: 100%;
          }
        }
        &:active {
          background-color: blueviolet;
          color: #fff;
        }
        &:after {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background-color: blueviolet;
          transition: all 0.3s ease-out;
          content: '';
        }
      }
    }
  }

  .svg-viewer-item-copy {
    ${buttonInitial}
    visibility: hidden;
    display: block;
    overflow: visible;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #2a2a2a;
    font-size: 13px;
    color: #fff;
    em {
      margin-left: 3px;
      font-style: normal;
      color: orange;
    }
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
    .svg-viewer-text {
      visibility: visible;
    }
  }

  &.dark {
    background-color: #2a2a2a;
  }

  .svg-viewer-text {
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

  .svg-viewer-source-inner {
    display: block;
    overflow: hidden;
    margin: 10px;
    box-sizing: border-box;
  }
`;

const NoResult = styled.div`
  padding: 50px 30px;
  font-size: 15px;
  color: #2a2a2a;
  line-height: 30px;
  text-align: center;
  word-break: break-all;
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
    isNameCopied: false,
    isPathCopied: false,
    isSelectedViewer: false
  };
});

const AddonSvgViewer = () => {
  const [iconList, setIconList] = useState(svgIconTokenFiles);
  const [clickCopy, setClickCopy] = useState(false);
  const [clickPathCopy, setClickPathCopy] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const handleCopyFilename = (item) => {
    return navigator.clipboard.writeText(item);
  };

  const handleBlurFilename = (type, idx) => {
    console.log('blur');
    if (type === 'name') {
      setIconList(
        iconList.map((item) =>
          item.idx === idx
            ? { ...item, isNameCopied: !item.isNameCopied }
            : item
        )
      );
    }
    if (type === 'path') {
      setIconList(
        iconList.map((item) =>
          item.idx === idx
            ? { ...item, isPathCopied: !item.isPathCopied }
            : item
        )
      );
    }
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
      const searchResultList = svgIconTokenFiles.filter((item) => {
        const filename = item.filename.split('/')[
          item.filename.split('/').length - 1
        ];
        return filename.toLowerCase().includes(value);
      });
      setIconList(searchResultList);
    } else {
      resetIconList();
    }
  };

  const handleClickDelete = (e) => {
    e.preventDefault();
    resetIconList();
    inputRef.current.focus();
  };

  const resetIconList = () => {
    setInputValue('');
    setIconList(svgIconTokenFiles);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, [iconList]);

  return (
    <>
      <Wrapper className="svg-viewer">
        <SearchBox className="svg-viewer-search">
          <div className="svg-viewer-search-inner">
            🔎
            <label htmlFor="srch">
              <input
                type="search"
                id="srch"
                placeholder="검색어를 입력하세요"
                value={inputValue}
                onChange={handleChangeSearch}
                ref={inputRef}
              />
            </label>
            {inputValue && (
              <button
                type="button"
                className="svg-viewer-srch-delete"
                aria-label="검색어삭제"
                onClick={handleClickDelete}
              />
            )}
          </div>
        </SearchBox>
        <List className="svg-viewer-list">
          {iconList.length > 0 ? (
            iconList.map((item, index) => {
              const filename = item.filename.split('/')[
                item.filename.split('/').length - 1
              ];
              return (
                <ListItem className="svg-viewer-item" key={index}>
                  <div className="svg-viewer-item-inner">
                    <ListName>
                      <span
                        className={classnames(
                          'svg-viewer-item-name',
                          item.isNameCopied && 'copy'
                        )}
                        onClick={() => handleCopyFilename(filename)}
                      >
                        <em>{filename}</em>
                      </span>
                      <div className="svg-viewer-item-path">
                        <span
                          className={classnames(
                            'svg-viewer-item-path-inner',
                            item.isPathCopied && 'copy'
                          )}
                          onClick={() => handleCopyFilename(item.filename)}
                        >
                          <span>{item.filename}</span>
                        </span>
                      </div>
                      {/* <button
                        type="button"
                        className="svg-viewer-item-copy"
                        onClick={() => handleCopyFilename(filename)}
                      >
                        {!clickCopy && (
                          <>
                            Click to Copy <em>Filename</em>
                          </>
                        )}
                        {clickCopy && <>Copied!</>}
                      </button> */}
                    </ListName>
                    <ListViewer
                      className={classnames(
                        'svg-viewer-item-look',
                        item.isSelectedViewer && 'dark'
                      )}
                      onClick={() => handleClickViewer(item.idx)}
                    >
                      <ListFile
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      />
                      {!item.isSelectedViewer && (
                        <span className="svg-viewer-text">
                          Click to view in dark mode
                        </span>
                      )}
                    </ListViewer>
                    <ListSource className="svg-viewer-source">
                      <span className="svg-viewer-source-inner">
                        {item.content}
                      </span>
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
      </Wrapper>
    </>
  );
};

addons.register('dajung/svg-viewer-addon', () => {
  addons.add('svg-viewer-addon/panel', {
    title: 'SVG Viewer',
    type: types.PANEL,
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <AddonSvgViewer />
      </AddonPanel>
    )
  });
});
