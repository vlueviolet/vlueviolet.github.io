// /* eslint-disable */
import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import style from './index.module.scss';

const svgIconsReq = require.context(
  '!!raw-loader!../../asset/images',
  true,
  /.\.svg$/
);

const svgIconTokenFiles = svgIconsReq.keys().map((filename) => {
  return {
    filename,
    content: svgIconsReq(filename).default
  };
});

const IconList = () => {
  const [iconList, setIconList] = useState(svgIconTokenFiles);
  const [selectedIcon, setSelectedIcon] = useState(false);
  const [clickCopy, setClickCopy] = useState(false);

  const handleCopyFilename = (item: any) => {
    // setSelectedIcon();
    setClickCopy(true);
    return navigator.clipboard.writeText(item);
  };

  const handleBlurFilename = () => {
    setClickCopy(false);
  };

  useEffect(() => {
    console.log(selectedIcon);
  }, [selectedIcon]);

  return (
    <ul className={style.list}>
      {iconList.map((item: any, index: number) => {
        const filename = item.filename.split('/')[
          item.filename.split('/').length - 1
        ];
        return (
          <li className={classnames(style.list_item, style.dark)}>
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
              <div className={style.list_viewer}>
                <span
                  className={style.list_file}
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
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
