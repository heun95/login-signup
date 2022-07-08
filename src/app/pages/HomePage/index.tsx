import * as React from 'react';
import { Helmet } from 'react-helmet-async';

export function HomePage() {
  const onClick = () => {
    localStorage.removeItem('toy_login_token');
    window.location.reload();
  };
  return (
    <>
      <Helmet>
        <title>Main Page</title>
      </Helmet>
      <h1>Main Page</h1>
      <button onClick={onClick}>로그아웃</button>
    </>
  );
}
