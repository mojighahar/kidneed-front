import Login from "./login";
import { Guard } from "@kidneed/types";

export const loginGuard: Guard = (matcher, _, router) => {
  if(matcher("guest")){
    return true
  }

  router.push('/parent')

  return false;
};
export default Login