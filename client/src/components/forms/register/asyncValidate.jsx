import AuthenticateApi from "api/authenticateApi";

const asyncValidate = (values /*, dispatch */) => {
  return AuthenticateApi.validateEmail(values.email).then((response) => {
    if (!response.valid) {
      throw { email: "That email is taken" };
    }
  });
};
export default asyncValidate;
