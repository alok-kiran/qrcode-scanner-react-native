import axios from 'axios';

export const BASE_URL = 'https://como-qr-scanner.herokuapp.com';

export const getMessage = async ({userId, qrcode, name}) => {
  try {
    const {data} = await axios.get(
      `${BASE_URL}/message?userId=${userId}&qrcode=${qrcode}&name=${name}`,
    );
    return data;
  } catch (error) {
    console.log(['error in getting message', error]);
  }
};

export const getScans = async ({userId}) => {
  try {
    const {data} = await axios.get(`${BASE_URL}/scans/${userId}`);
    return data;
  } catch (error) {
    console.log(['error in getScans', error]);
  }
};
