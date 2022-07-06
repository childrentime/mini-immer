import { DRAFT_STATE } from "./env";
import { ProxyState } from "./proxy";

export function isDraft(value: any): boolean {
  return !!value && !!value[DRAFT_STATE];
}
export function latest(state: ProxyState): any {
  return state.copy || state.base;
}

export function each<T>(
  obj: T,
  iter: (key: string | number, value: any) => void
): void;
export function each(obj: any, iter: any) {
  Object.keys(obj).forEach((key) => {
    iter(key, obj[key]);
  });
}
