import { useEffect } from "react";
import { Api } from "@kidneed/services";
import { useApp, useStatus } from ".";

export default function useUser(userId: number) {
  const isGuest = useStatus("guest");
  const { login, ctx } = useApp();

  useEffect(() => {
    if (!isGuest) {
      return;
    }

    (async function () {
      const user = await Api.actingAs(userId);
      if (user) {
        login(user);
      }
    })();
  }, [isGuest, login, userId]);

  return ctx.user;
}
