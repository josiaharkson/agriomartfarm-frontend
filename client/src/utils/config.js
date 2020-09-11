const config = () => {
  if (process.env.NODE_ENV !== "production") {
    return {
      API_URL: process.env.REACT_APP_API_URL_DEVELOPMENT,
    };
  } else {
    return {
      API_URL: process.env.REACT_APP_API_URL_PRODUCTION,
    };
  }
};

export default config;
