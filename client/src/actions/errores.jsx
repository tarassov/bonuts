import { demo_authenticate } from "./authActions";
import { sendConfirmEmail } from "./profile/profileActions";

const errores =  {
    5000: {caption: "Email not confirmed", actions:[
         {action: sendConfirmEmail, actionText: "Send again"}
     ]
    }
}
  
  
  export default errores;
  