// /* eslint-disable */
import React from 'react';
import classnames from 'classnames';
import style from './Header.module.scss';
import IconMenu from './images/icon-menu.svg';

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
        {[...gnbList].map((item, index) => (
          <a
            href="/"
            className={classnames(style.gnb_item)}
            key={`gnb-${index}`}
          >
            <span>{`${item.label}`}</span>
          </a>
        ))}
      </div>
    </header>
  );
};

export default Header;
