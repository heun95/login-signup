import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import completeImg from 'images/illustration-completed.svg';
import failImg from 'images/illustration_fail.svg';
import closeImg from 'images/ic_close_line_20px.svg';
import { Icon } from '../Icon';

interface ModalDefaultType {
  isOpenModal: boolean;
  content: string | null;
  icon: 'complete' | 'fail' | null;
  children: any;
  onClose: (isOpenModal: boolean) => void;
}

export const Modal = ({
  isOpenModal,
  content,
  icon,
  onClose,
  children,
}: ModalDefaultType) => {
  const close = () => {
    if (onClose) {
      onClose(false);
    }
  };
  return (
    <>
      {isOpenModal ? (
        <ModalContainer onClick={close}>
          <DialogBox>
            {icon === 'fail' && <img src={failImg} alt="" />}
            {icon === 'complete' && <img src={completeImg} alt="" />}
            {content}
            {children}
            <Icon
              hover
              onClick={close}
              src={closeImg}
              style={{
                zIndex: 10000,
                position: 'absolute',
                top: '27px',
                right: '27px',
              }}
            />
          </DialogBox>
        </ModalContainer>
      ) : null}
    </>
  );
};

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 10000;
`;

const DialogBox = styled.dialog`
  width: 440px;
  height: 432px;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: white;
  z-index: 10000;
`;

export default Modal;
