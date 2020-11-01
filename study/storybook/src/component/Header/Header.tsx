// /* eslint-disable */
import React from 'react';
import classnames from 'classnames';
import style from './Header.module.scss';
import IconMenu from './ico-menu.svg';
import Logo from 'asset/images/logo.png';

export interface ProfileProps {
  /** test */
  gnbList: any;
}

const Header = ({ gnbList }: ProfileProps) => {
  return (
    <header className={style.header}>
      <h1 className={style.logo}>
        <span className="blind">HIVELAB</span>
      </h1>

      <IconMenu width="100" />

      <img src={Logo} alt="" />
      <button
        type="button"
        className={style.btn_menu}
        aria-label="menu"
      ></button>
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
