import * as React from 'react';
import { forwardRef } from 'react';
import styled from 'styled-components';

interface IInput {
  label?: string;
  placeholder?: string;
  type?: string;
}

export const Input = forwardRef<HTMLInputElement, IInput>((props, ref) => {
  const { placeholder, label, type, ...inputProps } = props;

  return (
    <>
      <br />
      {label ? <LabelElement>{label}</LabelElement> : null}
      <br />
      <InputElement
        type={type}
        placeholder={placeholder}
        ref={ref}
        {...inputProps}
        autoComplete="on"
      />
    </>
  );
});

const LabelElement = styled.label`
  font-size: 0.8em;
  color: darkgray;
`;
const InputElement = styled.input`
  background: #ffffff;
  box-shadow: -2px 2px 6px rgba(58, 70, 93, 0.12);
  border: 1px solid #e1e5e8;
  border-radius: 4px;
  width: 100%;
  height: 36px;
  margin: 10px 0px;
  &:focus {
    outline: 2px solid #2eb7ff;
    box-shadow: 3px 8px 15px rgba(46, 183, 255, 0.12);
  }
`;
