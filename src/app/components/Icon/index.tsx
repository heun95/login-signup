import React, { forwardRef } from 'react';
import styled from 'styled-components';

interface IIcon {
  src: string;
  onClick?: () => void;
  hover?: boolean;
  style?: React.CSSProperties;
  width?: string;
  height?: string;
}

export const Icon = ({ src, width, height, style, onClick, hover }: IIcon) => {
  return (
    <Img
      src={src}
      width={width}
      height={height}
      style={style}
      hover={hover}
      onClick={onClick}
    />
  );
};

const Img = styled.img<{
  hover?: boolean;
  style?: React.CSSProperties;
  width?: string;
  height?: string;
}>`
  ${({ width, height }) => `
    width : ${width};
    height : ${height};
  `}
  ${({ hover }) =>
    hover === true &&
    `
  &:hover {
    transform: scale(1.2, 1.2);
    transition: transform.3s;
  }
  
  `};
`;
