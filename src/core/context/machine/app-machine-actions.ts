import { assign } from "xstate";
import { Api, strapi } from "@kidneed/services";
import {
  BootstrapDone,
  ChildrenFetchDone,
  LoggedInContext,
  PartialAppContext,
  SelectChildEvent,
} from "./app-machine-types";

export async function bootstrap() {
  const user = await Api.me();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return { user };
}

export async function fetchChildren(ctx: PartialAppContext) {
  const { user } = ctx as LoggedInContext;
  const children = await Api.children(user);
  return { children };
}

export const bootstrapDone = assign(
  (_: PartialAppContext, event: BootstrapDone) => ({
    user: event.data.user,
  })
);

export const childrenFetched = assign(
  (_: PartialAppContext, event: ChildrenFetchDone) => ({
    children: event.data.children,
  })
);

export const childSelected = assign(
  (_: PartialAppContext, event: SelectChildEvent) => ({
    child: event.child,
  })
);

export const logout = () => {
  strapi.logout();
};
