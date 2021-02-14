// /* eslint-disable */
import React from 'react';
import classnames from 'classnames';
import style from './index.module.scss';
import ProfileThumbnail from '../ProfileThumbnail';
import IconMenu from 'asset/images/svg/icon-menu.svg';
import IconHome from 'asset/images/svg/icon-home.svg';
import IconCloud from 'asset/images/svg/icon-cloud.svg';
import IconMail from 'asset/images/svg/icon-mail.svg';
import IconMessage from 'asset/images/svg/icon-message.svg';
import IconOffice from 'asset/images/svg/icon-office.svg';
import IconCalendar from 'asset/images/svg/icon-calendar.svg';
import IconContact from 'asset/images/svg/icon-contact.svg';
import IconSearch from 'asset/images/svg/icon-search.svg';

const Header = () => {
  return (
    <header className={classnames(style.header, style['header-wrapper'])}>
      <div
        className={classnames(
          style.header_inner,
          style['header-wrapper__inner']
        )}
      >
        <h1 className={style.header_logo}>
          <a href="/" className={style.header_logo_link}>
            <span className="blind">HIVELAB</span>
          </a>
        </h1>
        <button type="button" className={style.btn_menu} aria-label="menu">
          <IconMenu className={style.btn_menu_icon} />
        </button>
        <div className={style.gnb}>
          <button
            type="button"
            className={classnames(style.gnb_item, style.gnb_item_home)}
            arai-label="home"
            aria-pressed={true}
          >
            <IconHome />
          </button>
          <button
            type="button"
            className={classnames(style.gnb_item, style.gnb_item_home)}
            arai-label="message"
            aria-pressed={false}
          >
            <IconMessage />
          </button>
          <button
            type="button"
            className={classnames(style.gnb_item, style.gnb_item_home)}
            arai-label="mail"
            aria-pressed={false}
          >
            <IconMail />
          </button>
          <button
            type="button"
            className={classnames(style.gnb_item, style.gnb_item_home)}
            arai-label="calendar"
            aria-pressed={false}
          >
            <IconCalendar />
          </button>
          <button
            type="button"
            className={classnames(style.gnb_item, style.gnb_item_home)}
            arai-label="contact"
            aria-pressed={false}
          >
            <IconContact />
          </button>
          <button
            type="button"
            className={classnames(style.gnb_item, style.gnb_item_home)}
            arai-label="cloud"
            aria-pressed={false}
          >
            <IconCloud />
          </button>
          <button
            type="button"
            className={classnames(style.gnb_item, style.gnb_item_home)}
            arai-label="office"
            aria-pressed={false}
          >
            <IconOffice />
          </button>
        </div>
        <div className={style.utils}>
          <div className={style.utils_service}>
            <a href="/" className={style.utils_service_link}>
              인트라넷
            </a>
            <a href="/" className={style.utils_service_link}>
              HRMS
            </a>
            <a href="/" className={style.utils_service_link}>
              NAS
            </a>
          </div>
          <div className={style.utils_search}>
            <input
              type="search"
              className={style.utils_search_input}
              placeholder="사원검색"
            />
            <button type="button" className={style.utils_search_btn}>
              <IconSearch />
            </button>
          </div>
          <ProfileThumbnail />
        </div>
      </div>
    </header>
  );
};

export default Header;
