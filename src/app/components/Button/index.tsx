import React, { forwardRef } from 'react';
import styled from 'styled-components';

interface IButton {
  color?: 'primary' | 'secondary';
  children?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = forwardRef<HTMLButtonElement, IButton>((props, ref) => {
  const { color, onClick, children, disabled } = props;
  return (
    <ButtonElement
      color={color}
      onClick={onClick}
      ref={ref}
      disabled={disabled}
    >
      {children}
    </ButtonElement>
  );
});

const ButtonElement = styled.button<{
  color?: 'primary' | 'secondary';
}>`
  width: 224px;
  height: 40px;
  left: 20px;
  top: 176px;
  border: 0px;
  border-radius: 4px;
  color: white;
  font-weight: bold;

  ${({ color }) =>
    color === 'primary' &&
    `
    background: #2eb7ff;
    &:hover {
      background-color: #0099fe;
    }
    &:disabled{
      background-color: #E1E5E9;
      color: #828D99;
    }
  }

`}
  ${({ color }) =>
    color === 'secondary' &&
    `
    background: #304156;
    &:hover {
      background-color: #000000;
    }
  }
  `}
`;
