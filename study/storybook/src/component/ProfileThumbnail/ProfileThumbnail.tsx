// /* eslint-disable */
import React from 'react';
import style from './ProfileThumbnail.module.scss';

export interface ProfileThumbnailProps {
  /** 사용자 이미지 경로 */
  url?: string;
}

const ProfileThumbnail = ({ url }: ProfileThumbnailProps) => (
  <>
    <a href="#" className={style.profile_thumbnail}>
      {url && (
        <img
          src={url}
          className={style.profile_thumbnail_image}
          alt="username"
        />
      )}
      {!url && <span className={style.no_image} aria-label="username" />}
    </a>
  </>
);
export default ProfileThumbnail;
