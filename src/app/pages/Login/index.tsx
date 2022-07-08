import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppSelector, useAppDispatch } from 'app/hooks/useRedux';
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoginSlice } from './slice';
import { LoginData } from './slice/types';
import { Input } from 'app/components/Input';
import { Button } from 'app/components/Button';
import Modal from 'app/components/Modal';
import styled from 'styled-components';
import logoImg from 'images/algorithmlabs_logo-signature1.svg';
import closeImg from 'images/ic_close_line_20px.svg';
import loginImg from 'images/login_logo.png';
import { Icon } from 'app/components/Icon';

export interface IModalData {
  content: string | null;
  icon: 'complete' | 'fail' | null;
}

export function LoginPage() {
  const dispatch = useAppDispatch();
  const { actions } = useLoginSlice();
  const { isSuccess, isError } = useAppSelector(state => state.login);
  const { register, handleSubmit } = useForm<LoginData>();
  const history = useHistory();
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<IModalData>({
    content: null,
    icon: null,
  });

  const onSubmit = data => {
    dispatch(actions.tryLoginRequest(data));
  };
  const openModal = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };
  const redirectMain = () => {
    history.push('/');
  };

  // 모달 컴포넌트에 보내는 확인버튼 CLICK이벤트
  const modalOkClick = () => {
    if (isSuccess) {
      // 로그인성공시 메인으로가기
      redirectMain();
    } else {
      // 실패시 모달닫기
      closeModal();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setModalData({
        content: '로그인에 성공했습니다.',
        icon: 'complete',
      });
      openModal();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!isSuccess && isError) {
      setModalData({
        content: '로그인에 실패했습니다.',
        icon: 'fail',
      });
      openModal();
      dispatch(actions.loginStateClear());
    }
  }, [isError]);

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Modal isOpenModal={isOpenModal} {...modalData} onClose={closeModal}>
        <Button color="secondary" onClick={modalOkClick}>
          확인
        </Button>
      </Modal>
      <Container>
        <div></div>
        <LoginForm onSubmit={handleSubmit(onSubmit)}>
          <Logo src={logoImg} />
          <LoginImg src={loginImg} />
          <div>
            <Login>Log in</Login>
            <TextCenter>로그인이 필요한 기능입니다.</TextCenter>
            <Input
              {...register('email')}
              label={'email'}
              placeholder={'ooo@algorithmlabs.co.kr'}
            />
            <Input
              type="password"
              {...register('password')}
              label={'password'}
              placeholder={'비밀번호'}
            ></Input>
            <TextRight>비밀번호를 잊으셨나여?</TextRight>
            <Button color="primary">로그인</Button>
            <TextCenter>
              계정이 없나요?
              <Link to="/sign">
                <SignUp>회원가입</SignUp>
              </Link>
            </TextCenter>
          </div>
        </LoginForm>
        <div>
          <a href="https://algorithmlabs.io/">
            <Icon src={closeImg} hover />
          </a>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: 30%;
  right: 30%;
  top: 10%;
  bottom: 10%;
  width: 480px;
  height: 720px;
  radius: 4px;
  padding: 50px 50px;
  background: #ffffff;
  box-shadow: -7px 8px 16px rgba(55, 70, 95, 0.07);
  border-radius: 4px;
`;

const LoginForm = styled.form`
  width: 224px;
  height: 395px;
  margin: 0px 20px;
`;

const Logo = styled.img`
  width: 100%;
`;
const LoginImg = styled.img`
  height: 170px;
  display: block;
  margin: auto;
`;
const Login = styled.p`
  text-align: center;
  font-weight: bold;
`;

const TextCenter = styled.p`
  text-align: center;
`;
const TextRight = styled.p`
  text-align: right;
  font-size: 0.8em;
  color: darkgray;
`;
const SignUp = styled.span`
  margin-left: 5px;
  font-weight: bold;
  color: #2eb7ff;
  &:hover {
    color: #0099fe;
  }
`;
