import axios from 'axios';

export async function tryLoginApi(data) {
  const response = await axios.post(
    `https://leanai-back.algorithmlabs.io/account/sso/login`,
    data,
  );
  return response;
}
