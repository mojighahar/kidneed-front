import { AppStates, PartialAppContext } from "@kidneed/context";
import { NextRouter } from "next/router";

export type Guard = (
  matcher: (state: AppStates) => boolean,
  ctx: PartialAppContext,
  router: NextRouter
) => boolean;
