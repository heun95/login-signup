import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { Button } from 'app/components/Button';
import logo from 'images/algorithmlabs_logo-signature1.svg';
import close from 'images/ic_close_line_20px.svg';
import prev from 'images/ic_prev.svg';
import { Input } from 'app/components/Input';
import { Link, useHistory } from 'react-router-dom';
import signUpImg from 'images/signUp_logo.png';
import { useAppDispatch, useAppSelector } from 'app/hooks/useRedux';
import { useSignUpSlice } from './slice';
import { useForm } from 'react-hook-form';
import { SignUpData } from './slice/type';
import Modal from 'app/components/Modal';
import { useEffect, useRef, useState } from 'react';
import { IModalData } from '../Login';
import { Icon } from 'app/components/Icon';

export function SignUpPage() {
  const dispatch = useAppDispatch();
  const { actions } = useSignUpSlice();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SignUpData>({
    mode: 'onChange',
  });
  const history = useHistory();
  const signUpBtn = useRef<HTMLButtonElement>(null);
  const { isSuccess, isError } = useAppSelector(state => state.signup);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [modalData, setModalData] = useState<IModalData>({
    content: null,
    icon: null,
  });

  const onSubmit = data => {
    const email = data.email;
    const newData = {
      ...data,
      username: email.slice(0, email.indexOf('@')),
      user_group: 'PA-UNIV',
    };
    dispatch(actions.trySignUpRequest(newData));
  };
  const openModal = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };
  const redirectLogin = () => {
    history.push('/login');
  };
  useEffect(() => {
    if (isSuccess) {
      setModalData({
        content: '회원가입에 성공했습니다.',
        icon: 'complete',
      });
      openModal();
      dispatch(actions.signUpStateClear());
    }
  }, [isSuccess]);

  useEffect(() => {
    if (!isSuccess && isError) {
      setModalData({
        content: '회원가입에 실패했습니다.',
        icon: 'fail',
      });
      openModal();
      dispatch(actions.signUpStateClear());
    }
  }, [isError]);

  useEffect(() => {
    if (signUpBtn.current) {
      if (isValid) {
        signUpBtn.current.disabled = false;
      } else {
        signUpBtn.current.disabled = true;
      }
    }
  }, [isValid]);

  const modalOkClick = () => {
    if (isSuccess) {
      redirectLogin();
    } else {
      closeModal();
    }
  };
  return (
    <>
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <Modal isOpenModal={isOpenModal} {...modalData} onClose={closeModal}>
        <Button color="secondary" onClick={modalOkClick}>
          확인
        </Button>
      </Modal>
      <Container>
        <Link to="/login">
          <Icon src={prev} width={'21px'} height={'21px'} hover />
        </Link>
        <Item>
          <Logo src={logo} />
          <SignUpImg src={signUpImg} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <SignUp>Sign Up</SignUp>
            <TextCenter>회원가입을 위해 아래 항목을 작성해 주세요.</TextCenter>
            <Input
              label={'EMAIL'}
              placeholder={'abc@algorithmlabs.co.kr'}
              {...register('email', {
                required: '필수 응답 항목입니다.',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                  message: '이메일 형식이 아닙니다.',
                },
              })}
            />
            <ErrorMsg>{errors.email && errors.email.message}</ErrorMsg>
            <Input
              label={'NAME'}
              placeholder={'김알랩'}
              {...register('name', {
                required: '필수 응답 항목입니다.',
                pattern: {
                  value: /^[ㄱ-ㅎ|가-힣|a-z|A-Z|]+$/,
                  message: '특수문자,숫자는 입력할 수 없습니다.',
                },
              })}
            />
            <ErrorMsg>{errors.name && errors.name.message}</ErrorMsg>
            <Input
              label={'MOBILE NUMBER'}
              placeholder={'010-1234-5678'}
              {...register('phone_number', {
                required: '필수 응답 항목입니다.',
                pattern: {
                  value: /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/,
                  message: '휴대폰 번호 형식이 아닙니다.',
                },
              })}
            />
            <ErrorMsg>
              {errors.phone_number && errors.phone_number.message}
            </ErrorMsg>
            <Input
              type="password"
              label={'PASSWORD'}
              placeholder={'비밀번호'}
              {...register('password', {
                required: '필수 응답 항목입니다.',
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/i,
                  message:
                    '길이는 8~20자리, 영문,특수문자,숫자를 포함시켜주세요.',
                },
              })}
            />
            <ErrorMsg>{errors.password && errors.password.message}</ErrorMsg>
            <Input
              type="password"
              label={'PASSWORD VERIFICATION'}
              placeholder={'비밀번호 확인'}
              {...register('confirm', {
                required: '필수 응답 항목입니다.',
                validate: value =>
                  value === watch('password') ||
                  '비밀번호가 일치하지 않습니다.',
              })}
            />
            <ErrorMsg>{errors.confirm && errors.confirm.message}</ErrorMsg>
            <Button color="primary" ref={signUpBtn} disabled>
              회원가입
            </Button>
            <TextCenter>
              계정이 이미 있나요?
              <Link to={'/login'}>
                <LoginText>로그인</LoginText>
              </Link>
            </TextCenter>
          </form>
        </Item>
        <div>
          <a href="https://algorithmlabs.io/">
            <Icon src={close} hover />
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
  height: 950px;
  radius: 4px;
  padding: 50px 50px;
  background: #ffffff;
  box-shadow: -7px 8px 16px rgba(55, 70, 95, 0.07);
  border-radius: 4px;
`;

const Item = styled.div`
  width: 224px;
  margin: 0px 20px;
`;
const Logo = styled.img`
  width: 100%;
`;
const SignUpImg = styled.img`
  height: 170px;
  display: block;
  margin: auto;
  margin-top: 18px;
`;
const SignUp = styled.p`
  text-align: center;
  font-weight: bold;
`;

const TextCenter = styled.p`
  text-align: center;
`;
const LoginText = styled.span`
  margin-left: 5px;
  font-weight: bold;
  color: #2eb7ff;
  &:hover {
    color: #0099fe;
  }
`;
const ErrorMsg = styled.span`
  color: red;
  font-size: 0.6em;
}
`;
