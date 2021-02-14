// /* eslint-disable */
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import style from './index.module.scss';

const svgIconsReq = require.context(
  '!!raw-loader!../../asset/images',
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

export interface IconListProps {
  /** svg 아이콘 컬러 변경 */
  color?: any;
}

const IconList = ({ color }: IconListProps) => {
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
    <ul className={style.list}>
      {iconList.map((item: any, index: number) => {
        const filename = item.filename.split('/')[
          item.filename.split('/').length - 1
        ];
        return (
          <li className={style.list_item} key={index}>
            <div className={style.list_inner}>
              <div className={style.list_name}>
                <span className={style.list_name_inner}>{filename}</span>
                <div className={style.list_path}>
                  <span className={style.list_path_inner}>{item.filename}</span>
                </div>
                <button
                  type='button'
                  className={style.copy}
                  onClick={() => handleCopyFilename(filename)}
                  onBlur={handleBlurFilename}
                >
                  {!clickCopy && (
                    <>
                      Click to Copy{' '}
                      <em className={style.list_name_em}>Filename</em>
                    </>
                  )}
                  {clickCopy && <>Copied!</>}
                </button>
              </div>
              <div
                className={classnames(
                  style.list_viewer,
                  item.isSelectedViewer && style.dark
                )}
                onClick={() => handleClickViewer(index)}
              >
                <span
                  className={style.list_file}
                  style={{ color: `${color}` }}
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
                {!item.isSelectedViewer && (
                  <span className={style.list_viewer_text}>
                    Click to view in dark mode
                  </span>
                )}
              </div>
              <div className={style.list_source}>
                <span className={style.list_source_inner}>{item.content}</span>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default IconList;
