export const authorize = (_email, _password) => {
  return Promise.resolve({ token: "fake-token" });
};

export const checkToken = (_token) => {
  return Promise.resolve({ name: "Rubi" });
};
