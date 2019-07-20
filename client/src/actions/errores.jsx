import { demo_authenticate } from "./authActions";

const errores =  {
    5000: {caption: "Email not confirmed", actions:[
         {action: demo_authenticate, actionText: "demo mode"}
     ]
    }
}
  
  
  export default errores;
  