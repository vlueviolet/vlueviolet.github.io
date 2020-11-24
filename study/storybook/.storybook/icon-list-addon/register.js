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

  const handleCopyFilename = (item: any) => {
    setClickCopy(true);
    return navigator.clipboard.writeText(item);
  };

  const handleBlurFilename = () => {
    setClickCopy(false);
  };

  const handleClickViewer = (idx: number) => {
    setIconList(
      iconList.map((item) =>
        item.idx === idx
          ? { ...item, isSelectedViewer: !item.isSelectedViewer }
          : item
      )
    );
  };

  useEffect(() => {}, [iconList]);

  return (
    <List>
      {iconList.map((item: any, index: number) => {
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
                      Click to Copy <em className="list_name_em">Filename</em>
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
                <ListFile dangerouslySetInnerHTML={{ __html: item.content }} />
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
      })}
    </List>
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
