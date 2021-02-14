import React, { Fragment, useState, useEffect, useRef } from 'react';
import { AddonPanel } from '@storybook/components';
import { addons, types } from '@storybook/addons';
import classnames from 'classnames';
import {
  Wrapper,
  SearchBox,
  List,
  ListItem,
  ListName,
  ListViewer,
  ListFile,
  ListSource,
  NoResult
} from './style';

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
    isSelectedViewer: false
  };
});

const AddonSvgViewer = () => {
  const [iconList, setIconList] = useState(svgIconTokenFiles);
  const [clickCopy, setClickCopy] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const handleCopyFilename = (item) => {
    return navigator.clipboard.writeText(item);
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
              const filePath = item.filename.substring(2, item.filename.length);
              return (
                <ListItem className="svg-viewer-item" key={index}>
                  <div className="svg-viewer-item-inner">
                    <ListName>
                      <span
                        className="svg-viewer-item-name"
                        onClick={() => handleCopyFilename(filename)}
                      >
                        <em>{filename}</em>
                      </span>
                      <div className="svg-viewer-item-path">
                        <span
                          className="svg-viewer-item-path-inner"
                          onClick={() => handleCopyFilename(filePath)}
                        >
                          <span>{filePath}</span>
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
