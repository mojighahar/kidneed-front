import { useSelector } from "@xstate/react";
import { AppContext } from "@kidneed/context";
import { Models } from "@kidneed/types";
import { useCallback, useContext } from "react";

export default function useApp() {
  const { appService } = useContext(AppContext);

  const { send } = appService;

  const ctx = useSelector(appService, (state) => {
    return state.context;
  });

  const login = useCallback(
    (user: Models.User) => send("LOGGED_IN", { user }),
    [send]
  );

  const logout = useCallback(() => send("LOGGED_OUT"), [send]);

  const selectChild = useCallback(
    (child: Models.Child) => send("SELECT_CHILD", { child }),
    [send]
  );

  return {
    ctx,
    login,
    logout,
    selectChild,
  };
}
