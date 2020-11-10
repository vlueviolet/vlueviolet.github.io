// /* eslint-disable */
import React from 'react';
import style from './SayHello.module.scss';

export interface SayHelloProps {
  /** 인사말 */
  label?: string;
}

const SayHello = ({ label }: SayHelloProps) => (
  <p className={style.hello}>
    <span>{label}</span>
  </p>
);

export default SayHello;
