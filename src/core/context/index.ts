import React from "react";
import { InterpreterFrom } from "xstate";
import { appMachine } from "./machine/app-machine";
import { AppState } from "./machine/app-machine-types";

export interface AppContext {
  appService: InterpreterFrom<typeof appMachine>;
}

export const AppContext = React.createContext<AppContext>({} as AppContext);

export type AppStates = AppState["value"];

export type { PartialAppContext } from "./machine/app-machine-types";
export { appMachine };
