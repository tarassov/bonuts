import { sendConfirmEmail } from "./userActions";

const errores = {
  5000: {
    caption: "Email not confirmed",
    actions: [{ action: sendConfirmEmail, actionText: "Send again" }],
  },
};

export default errores;
