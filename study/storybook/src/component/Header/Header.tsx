// /* eslint-disable */
import React from 'react';
import classnames from 'classnames';
import style from './Header.module.scss';
import IconMenu from 'asset/images/svg/icon-menu.svg';
import IconHome from 'asset/images/svg/icon-home.svg';

export interface ProfileProps {
  /** global nav list */
  gnbList: any;
}

const Header = ({ gnbList }: ProfileProps) => {
  return (
    <header className={style.header}>
      <h1 className={style.header_logo}>
        <a href="/" className={style.header_logo_link}>
          <span className="blind">HIVELAB</span>
        </a>
      </h1>
      <button type="button" className={style.btn_menu} aria-label="menu">
        <IconMenu className={style.btn_menu_icon} />
      </button>
      <div className={style.gnb}>
        {[...gnbList].map((item, index) => {
          // const itemComponent = React.createElement(`Icon${item.label}`);
          // console.log(itemComponent);
          return (
            <a
              href="/"
              className={classnames(
                style.gnb_item,
                style[`gnb_item_${item.label}`]
              )}
              key={`gnb-${index}`}
            >
              {/* <itemComponent /> */}
              {/* {React.createElement(`Icon${item.label}`)} */}
              <span>{`${item.label}`}</span>
            </a>
          );
        })}
      </div>
    </header>
  );
};

export default Header;
