// /* eslint-disable */
import React from 'react';
import style from './index.module.scss';
import IconPlaceholder from '../../asset/images/svg/icon-user.svg';

export interface ProfileThumbnailProps {
  /** 사용자 이미지 경로 */
  thumbnailUrl?: string;
  /** 사용자 이름*/
  alt?: string;
}

const ProfileThumbnail = ({ thumbnailUrl, alt }: ProfileThumbnailProps) => (
  <>
    <a href="/" className={style.profile_thumbnail}>
      {thumbnailUrl && (
        <img
          src={IconPlaceholder}
          className={style.profile_thumbnail_image}
          alt={alt ? alt : ''}
        />
      )}
      {!thumbnailUrl && (
        <span className={style.no_image} aria-label="username" />
      )}
    </a>
  </>
);
export default ProfileThumbnail;
