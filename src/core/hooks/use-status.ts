import { AppContext, AppStates } from "@kidneed/context";
import { useSelector } from "@xstate/react";
import { useContext } from "react";

type Matcher = AppStates | Array<AppStates>;

type MatchedType<T> = T extends AppStates
  ? boolean
  : T extends Array<AppStates>
  ? Array<boolean>
  : never;

export default function useStatus<T extends Matcher>(matchers: T) {
  const { appService } = useContext(AppContext);

  const matched = useSelector(appService, (state) => {
    return Array.isArray(matchers)
      ? matchers.map(state.matches)
      : state.matches(matchers);
  });

  return matched as MatchedType<T>;
}
