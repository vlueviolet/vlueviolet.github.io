/* eslint-disable */
import React from 'react';
import IconCloud from 'asset/images/svg/icon-cloud.svg';

export interface IconProps {
  /** svg element */
  IconSvgElement: any;
  /** width px */
  size: number;
  /** fill color */
  color: any;
}

const Icon = ({ IconSvgElement, size, color }: IconProps) => {
  return <IconSvgElement width={size} height={size} color={color} />;
};

Icon.defaultProps = {
  IconSvgElement: IconCloud,
  size: 25,
  color: '#000',
};

export default Icon;
