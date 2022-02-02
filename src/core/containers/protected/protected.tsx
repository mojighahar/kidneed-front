import { useContext } from "react";
import { AppContext } from "@kidneed/context";
import { useActor } from "@xstate/react";
import { useRouter } from "next/router";
import { Guard } from "@kidneed/types";
import { Reload, Loading, AccessDenied } from "@kidneed/containers";

export type ProtectedProps = {
  children: React.ReactNode;
  guard: Guard;
};

export default function Protected({ guard, children }: ProtectedProps) {
  const { appService } = useContext(AppContext);
  const router = useRouter();
  const [state] = useActor(appService);

  if (state.matches({ loggedIn: "error" })) {
    <Reload />;
  }

  if (["init", { loggedIn: "init" }].some(state.matches)) {
    return <Loading />;
  }

  if (!guard(state.matches, state.context, router)) {
    return <AccessDenied />;
  }

  return <>{children}</>;
}
