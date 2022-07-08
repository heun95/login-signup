import axios from 'axios';

export async function trySignUpApi(data) {
  const response = await axios.post(
    `https://leanai-back.algorithmlabs.io/account/sso/register`,
    data,
  );
  return response;
}
