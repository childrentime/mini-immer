import { ProxyState } from "./proxy";
import { each, isDraft } from "./common";
import { DRAFT_STATE } from "./env";

export function finalize(value: ProxyState) {
  const state = value[DRAFT_STATE];
  if (!state.modified) {
    return state.base;
  }
  const result = state.copy;
  each(result, (key, childValue) => finalizeProperty(result, key, childValue));
  return state.copy;
}

function finalizeProperty(
  targetObject: any,
  prop: string | number,
  childValue: any
) {
  if (isDraft(childValue)) {
    const result = finalize(childValue);
    targetObject[prop] = result;
  }
}
