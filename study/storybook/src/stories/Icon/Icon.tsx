/* eslint-disable */
import React from 'react';
import IconCloud from 'asset/images/svg/icon-cloud.svg';
// const reqSvgs = require.context('asset/images/svg', true, /\.svg$/);

export interface IconProps {
  /** svg element */
  IconSvgElement: any;
  /** width px */
  size: number;
  /** fill color */
  color: any;
}

const Icon = ({ IconSvgElement, size, color }: IconProps) => {
  const test = document.getElementById('test');
  console.log(test);

  return (
    <>
      <IconSvgElement width={size} height={size} color={color} />
      {/* 1111
      <div>
        {reqSvgs.keys().map((filename) => {
          import(`asset/images/svg/${filename.replace('./', '')}`)
            // .then((module) => module.loadPageInto(test))
            .then((module) => module.loadPageInto(test))
            .catch(() => console.error('실패'));
        })}
      </div>
      2222 */}
    </>
  );
};

Icon.defaultProps = {
  IconSvgElement: IconCloud,
  size: 25,
  color: '#000',
};

export default Icon;
