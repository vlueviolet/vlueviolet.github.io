import React, { MouseEvent } from 'react';
import classnames from 'classnames';
import style from './index.module.scss';
// import IconSearch from 'asset/images/svg/icon-search.svg';

export interface ButtonProps {
  /** 버튼 타입 */
  type?: string;
  /** 버튼 텍스트 */
  label: string;
  /** 비활성화 */
  disabled?: boolean;
  /** 클릭 함수 */
  // hadleClickBtn: (e: MouseEvent<HTMLButtonElement>) => void;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  // onMouseOver?: (e: MouseEvent<HTMLButtonElement>) => void;
  onMouseOver?(e: MouseEvent<HTMLButtonElement>): void;
}

const Button = ({
  type = 'default',
  label,
  disabled = false,
  onClick,
  onMouseOver
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={classnames(
        style.btn,
        type !== 'default' && style[`btn-${type}`]
      )}
      disabled={disabled}
      onClick={onClick}
      onMouseOver={onMouseOver}
      data-id="temp-button-id"
    >
      {label}
    </button>
  );
};

export default Button;
