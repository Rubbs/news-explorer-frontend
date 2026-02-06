export const authorize = (email, password) => {
  return Promise.resolve({ token: "fake-token" });
};

export const checkToken = (token) => {
  return Promise.resolve({
    data: {
      name: "User",
      email: "user@example.com",
      _id: "fake-id",
    },
  });
};
