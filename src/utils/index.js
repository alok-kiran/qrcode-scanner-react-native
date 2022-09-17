export const validatePhoneNumber = phone => {
  const regex = /^\+/;
  return regex.test(phone);
};
