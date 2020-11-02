// /* eslint-disable */
import React from 'react';
import style from './ProfileThumbnail.module.scss';

export interface ProfileThumbnailProps {
  url?: string;
}

const ProfileThumbnail = ({ url }: ProfileThumbnailProps) => (
  <>
    <a href="#" className={style.profile_thumbnail}>
      {url && <img src={url} alt="username" />}
      {!url && <span className={style.no_image} aria-label="username" />}
    </a>
  </>
);
export default ProfileThumbnail;
